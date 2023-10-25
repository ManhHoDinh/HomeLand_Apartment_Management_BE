import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TypeORMError } from "typeorm";
import { Person, PersonRole } from "./entities/person.entity";
import { hashSync } from "bcrypt";
import { StorageManager } from "../storage/storage.service";
import { isQueryAffected } from "../helper/validation";
import { HashService } from "../hash/hash.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { PersonFactory } from "../person-factory/person-factory.service";
import { IRepository } from "../helper/interface/IRepository.interface";

/**
 * Person repository interface
 */
export abstract class PersonRepository implements IRepository<Person> {
    abstract findOne(id: string): Promise<Person | null>;
    abstract update(id: string, updateEntityDto: any): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    abstract findOneByEmail(email: string): Promise<Person | null>;
    abstract create(
        createPersonDto: CreatePersonDto,
        creatorRole?: PersonRole,
        id?: string,
    ): Promise<Person>;
    abstract createAccount(
        id: string,
        createAccountDto: CreateAccountDto,
    ): Promise<Person>;
    abstract findAll(role?: PersonRole): Promise<Person[]>;
}

@Injectable()
export class PersonService implements PersonRepository {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        private readonly storageManager: StorageManager,
        private readonly hashService: HashService,
        private readonly personFactory: PersonFactory,
    ) {}

    /**
     * Create a person and insert into database
     * @param createPersonDto JSON object to create person
     * @param creatorRole role of who evoke this function
     * @default creatorRole undefined
     * @param id set the id of person, if not set, id will be generated
     * @default id undefined
     * @returns inserted person
     */
    async create(
        createPersonDto: CreatePersonDto,
        creatorRole?: PersonRole,
        id?: string,
    ): Promise<Person> {
        if (creatorRole) {
            switch (createPersonDto.role) {
                case PersonRole.ADMIN:
                    if (creatorRole !== PersonRole.ADMIN)
                        throw new UnauthorizedException(
                            "Creator's role is not sufficient",
                        );
                    break;

                case PersonRole.MANAGER:
                    if (creatorRole !== PersonRole.ADMIN)
                        throw new UnauthorizedException(
                            "Creator's role is not sufficient",
                        );
                    break;

                case PersonRole.RESIDENT:
                    if (
                        !(
                            creatorRole == PersonRole.MANAGER ||
                            creatorRole == PersonRole.ADMIN
                        )
                    ) {
                        throw new UnauthorizedException(
                            "Creator's role is not sufficient",
                        );
                    }
                    break;

                case PersonRole.TECHINICIAN:
                    if (
                        !(
                            creatorRole == PersonRole.MANAGER ||
                            creatorRole == PersonRole.ADMIN
                        )
                    ) {
                        throw new UnauthorizedException(
                            "Creator's role is not sufficient",
                        );
                    }
                    break;

                default:
                    break;
            }
        }
        const {
            front_identify_card_photo,
            back_identify_card_photo,
            avatar_photo,
            ...rest
        } = createPersonDto;

        let person = this.personFactory.create(rest);
        if (person.password) {
            person.password = this.hashService.hash(person.password);
        }

        if (id) person.id = id;

        try {
            const frontURL = await this.storageManager.upload(
                front_identify_card_photo,
                "person/" + person.id + "/front_identify_card_photo_URL.png",
                "image/png",
            );
            const backURL = await this.storageManager.upload(
                back_identify_card_photo,
                "person/" + person.id + "/back_identify_card_photo_URL.png",
                "image/png",
            );
            if (avatar_photo) {
                const avatarURL = await this.storageManager.upload(
                    avatar_photo,
                    "person/" + person.id + "/avatarURL.png",
                    "image/png",
                );
                person.avatarURL = avatarURL;
            }
            person.front_identify_card_photo_URL = frontURL;
            person.back_identify_card_photo_URL = backURL;
            return await this.personRepository.save(person);
        } catch (error) {
            if (error instanceof TypeORMError) {
                try {
                    await this.storageManager.remove([
                        "/person/" +
                            person.id +
                            "/front_identify_card_photo_URL.png",
                        "/person/" +
                            person.id +
                            "/back_identify_card_photo_URL.png",
                    ]);
                } catch (error) {
                    console.error(error);
                }
            }
            throw error;
        }
    }

    async createAccount(
        id: string,
        createAccountDto: CreateAccountDto,
    ): Promise<Person> {
        let person = await this.personRepository.findOne({
            where: { id },
        });
        if (!person) throw new NotFoundException();
        if (person.password)
            throw new ConflictException("Person profile already has account");
        person.email = createAccountDto.email;
        person.password = hashSync(createAccountDto.password, 10);

        return await this.personRepository.save(person);
    }

    findOne(id: string): Promise<Person | null> {
        return this.personRepository.findOne({
            where: {
                id,
            },
            cache: true,
        });
    }

    findOneByEmail(email: string): Promise<Person | null> {
        return this.personRepository.findOne({
            where: {
                email,
            },
            cache: true,
        });
    }

    findAll(role?: PersonRole): Promise<Person[]> {
        return this.personRepository.find({
            where: role ? { role } : {},
            cache: true,
        });
    }

    async update(id: string, updatePersonDto: UpdatePersonDto) {
        let result = await this.personRepository.update(id, updatePersonDto);
        return isQueryAffected(result);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.personRepository.softDelete({ id });
        return isQueryAffected(result);
    }

    async hardDelete?(id: any): Promise<boolean> {
        try {
            const result = await this.personRepository.delete({ id });
            return isQueryAffected(result);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Person, PersonRole } from "./entities/person.entity";
import { hashSync } from "bcrypt";
import {
    IdGenerator,
    IdGeneratorService,
} from "../id_generator/id_generator.service";
import { UploadService } from "../upload/upload.service";
import { BaseRepository } from "../helper/base/base_repository";

export abstract class PersonRepository extends BaseRepository<
    CreatePersonDto,
    Person
> {
    abstract findOneByEmail(email: string): Promise<Person | null>;
    abstract create(
        createDto: CreatePersonDto,
        creatorRole?: PersonRole
    ): Promise<Person>;
}

@Injectable()
export class PersonService implements PersonRepository {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        private readonly idGenerator: IdGenerator,
        private readonly uploadService: UploadService
    ) {}

    async create(
        createDto: CreatePersonDto,
        creatorRole?: PersonRole
    ): Promise<Person> {
        if (creatorRole) {
            switch (createDto.role) {
                case PersonRole.ADMIN:
                    if (creatorRole !== PersonRole.ADMIN)
                        throw new UnauthorizedException(
                            "Creator's role is not sufficient"
                        );
                    break;

                case PersonRole.MANAGER:
                    if (creatorRole !== PersonRole.ADMIN)
                        throw new UnauthorizedException(
                            "Creator's role is not sufficient"
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
                            "Creator's role is not sufficient"
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
                            "Creator's role is not sufficient"
                        );
                    }
                    break;

                default:
                    break;
            }
        }
        const {
            front_identify_card_photo_URL,
            back_identify_card_photo_URL,
            ...rest
        } = createDto;

        let person = this.personRepository.create(rest);
        if (person.password) {
            person.password = hashSync(person.password, 10);
        }
        switch (createDto.role) {
            case PersonRole.ADMIN:
                person.id = "A" + this.idGenerator.generateId();
                break;
            case PersonRole.MANAGER:
                person.id = "M" + this.idGenerator.generateId();
                break;
            case PersonRole.RESIDENT:
                person.id = "R" + this.idGenerator.generateId();
                break;
            case PersonRole.TECHINICIAN:
                person.id = "T" + this.idGenerator.generateId();
                break;
            default:
                person.id = "U" + this.idGenerator.generateId();
                break;
        }

        try {
            const [dataFront, dataBack] = await Promise.all([
                this.uploadService.upload(
                    front_identify_card_photo_URL,
                    "/person/" +
                        person.id +
                        "/front_identify_card_photo_URL.png",
                    "image/png"
                ),

                this.uploadService.upload(
                    back_identify_card_photo_URL,
                    "/person/" +
                        person.id +
                        "/back_identify_card_photo_URL.png",
                    "image/png"
                ),
            ]);
            if (dataFront && dataBack) {
                person.front_identify_card_photo_URL =
                    this.uploadService.BLOB_STORAGE_URL + "/" + dataFront.path;
                person.back_identify_card_photo_URL =
                    this.uploadService.BLOB_STORAGE_URL + "/" + dataBack.path;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }

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

    findAll(): Promise<Person[]> {
        return this.personRepository.find({
            cache: true,
        });
    }

    async update(id: string, updatePersonDto: UpdatePersonDto) {
        let result = await this.personRepository.update(id, updatePersonDto);
        if (!result.affected) return false;
        if (result.affected > 0) return true;
        return false;
    }

    async remove(id: string) {
        const result = await this.personRepository.softDelete(id);
        if (!result.affected) return false;
        if (result.affected > 0) return true;
        return false;
    }
}

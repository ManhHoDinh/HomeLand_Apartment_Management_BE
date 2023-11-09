import { UpdateResidentDto } from "./dto/update-resident.dto";
import { Resident } from "./entities/resident.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository, TypeORMError } from "typeorm";
import { StorageManager } from "../storage/storage.service";
import { isQueryAffected } from "../helper/validation";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { MemoryStoredFile } from "nestjs-form-data";
import { Profile } from "../helper/class/profile.entity";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { IdGenerator } from "../id-generator/id-generator.service";
import { plainToInstance } from "class-transformer";
import { Account } from "../account/entities/account.entity";
import { HashService } from "../hash/hash.service";

/**
 * Person repository interface
 */
export abstract class ResidentRepository {
    abstract findOne(id: string): Promise<Resident | null>;
    abstract update(id: string, updateEntityDto: any): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    abstract create(
        createResidentDto: CreateResidentDto,
        id?: string,
    ): Promise<Resident>;
    abstract updateResident(
        id: string,
        updateResidentDto: UpdateResidentDto,
    ): Promise<Resident>;
    abstract findAll(): Promise<Resident[]>;
    abstract search(query: string): Promise<Resident[]>;
}

@Injectable()
export class ResidentService implements ResidentRepository {
    constructor(
        @InjectRepository(Resident)
        private readonly residentRepository: Repository<Resident>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly storageManager: StorageManager,
        private readonly hashService: HashService,
        private readonly idGenerate: IdGenerator,
        private readonly avatarGenerator: AvatarGenerator,
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
        createResidentDto: CreateResidentDto,
        id?: string,
    ): Promise<Resident> {
        const {
            front_identify_card_photo,
            back_identify_card_photo,
            avatar_photo,
            payment_info,
            email,
            ...rest
        } = createResidentDto;

        const profile = plainToInstance(Profile, rest);
        let resident = new Resident();
        resident.payment_info = payment_info;
        if (id) resident.id = id;
        else resident.id = "RES" + this.idGenerate.generateId();
        try {
            const frontPhoto = front_identify_card_photo as MemoryStoredFile;
            const backPhoto = front_identify_card_photo as MemoryStoredFile;
            const frontURL = await this.storageManager.upload(
                frontPhoto.buffer,
                "resident/" +
                    resident.id +
                    "/front_identify_card_photo_URL." +
                    (frontPhoto.extension || "png"),
                frontPhoto.mimetype || "image/png",
            );
            const backURL = await this.storageManager.upload(
                backPhoto.buffer,
                "resident/" +
                    resident.id +
                    "/back_identify_card_photo_URL." +
                    (backPhoto.extension || "png"),
                backPhoto.mimetype || "image/png",
            );
            let avatarURL: string | undefined;

            if (avatar_photo) {
                const avataPhoto = avatar_photo as MemoryStoredFile;
                avatarURL = await this.storageManager.upload(
                    avataPhoto.buffer,
                    "resident/" +
                        resident.id +
                        "/avatarURL." +
                        (avataPhoto.extension || "png"),
                    avataPhoto.mimetype || "image/png",
                );
            } else {
                const avatar = await this.avatarGenerator.generateAvatar(
                    profile.name,
                );
                avatarURL = await this.storageManager.upload(
                    avatar,
                    "resident/" + resident.id + "/avatarURL.svg",
                    "image/svg+xml",
                );
            }

            profile.front_identify_card_photo_URL = frontURL;
            profile.back_identify_card_photo_URL = backURL;
            resident.profile = profile;
            const residentData = await this.residentRepository.save(resident);
            if (email) {
                resident.account_id = resident.id;

                let account = new Account();
                account.owner_id = resident.account_id;
                account.email = email;
                account.password = this.hashService.hash(profile.phone_number);
                account.avatarURL = avatarURL;
                account.resident = resident;
                await this.accountRepository.save(account);
            }
            return residentData;
        } catch (error) {
            if (error instanceof TypeORMError) {
                try {
                    await this.storageManager.remove([
                        "/resident/" +
                            resident.id +
                            "/front_identify_card_photo_URL.png",
                        "/resident/" +
                            resident.id +
                            "/back_identify_card_photo_URL.png",
                    ]);
                } catch (error) {
                    console.error(error);
                }
            }
            throw error;
        }
    }
    async search(query: string): Promise<Resident[]> {
        const result = await this.residentRepository.find({
            where: {
                profile: { name: Like(`%${query}%`) },
            },
        });

        return result;
    }
    async updateResident(
        id: string,
        updateResidentDto: UpdateResidentDto,
    ): Promise<Resident> {
        let resident = await this.residentRepository.findOne({
            where: { id },
        });
        console.log(updateResidentDto);
        const { payment_info, avatar_photo, email, ...rest } =
            updateResidentDto;
        if (!resident) throw new NotFoundException();
        const account = await this.accountRepository.findOne({
            where: { owner_id: id },
        });

        resident.payment_info = payment_info;
        let profile = plainToInstance(Profile, rest);
        let avatarURL: string | undefined;

        if (avatar_photo) {
            const avataPhoto = avatar_photo as MemoryStoredFile;
            avatarURL = await this.storageManager.upload(
                avataPhoto.buffer,
                "resident/" +
                    resident.id +
                    "/avatarURL." +
                    (avataPhoto.extension || "png"),
                avataPhoto.mimetype || "image/png",
            );
        } else {
            const avatar = await this.avatarGenerator.generateAvatar(
                profile.name,
            );
            avatarURL = await this.storageManager.upload(
                avatar,
                "resident/" + resident.id + "/avatarURL.svg",
                "image/svg+xml",
            );
        }
        if (account !== null) {
            console.log(email, avatarURL);
            account.email = email as string;
            account.avatarURL = avatarURL;
            await this.accountRepository.save(account);
        }

        resident.profile = profile;
        return await this.residentRepository.save(resident);
    }
    findOne(id: string): Promise<Resident | null> {
        return this.residentRepository.findOne({
            where: {
                id,
            },
            cache: true,
            relations: ["account"],
        });
    }

    async update(id: string, UpdateResidentDto: UpdateResidentDto) {
        let result = await this.residentRepository.update(
            id,
            UpdateResidentDto,
        );
        return isQueryAffected(result);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.residentRepository.softDelete({ id });

        return isQueryAffected(result);
    }

    async hardDelete?(id: any): Promise<boolean> {
        try {
            const result = await this.residentRepository.delete({ id });
            return isQueryAffected(result);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findAll(): Promise<Resident[]> {
        const residents = await this.residentRepository.find({
            relations: ["account"],
        });
        return residents;
    }
}

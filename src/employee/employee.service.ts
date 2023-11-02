import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TypeORMError,DataSource } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { hashSync } from "bcrypt";
import { StorageManager } from "../storage/storage.service";
import { isQueryAffected } from "../helper/validation";
import { HashService } from "../hash/hash.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { MemoryStoredFile } from "nestjs-form-data";
import { PersonRole, Profile } from "../helper/class/profile.entity";
import { IdGenerator } from "../id-generator/id-generator.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { profile } from "console";

export abstract class EmployeeRepository implements IRepository<Employee> {
    abstract findOne(id: string): Promise<Employee | null>;
    abstract update(id: string, updateEntityDto: any): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    // abstract findOneByEmail(email: string): Promise<Employee | null>;
    abstract create(
        createEmployeeDto: CreateEmployeeDto,
        id?: string,
    ): Promise<Employee>;
    // abstract update(
    //     id: string,
    //     updateEmployeeDto: UpdateEmployeeDto,
    // ): Promise<Employee>;

    abstract findAll(role?: PersonRole): Promise<Employee[]>;
}

@Injectable()
export class EmployeeService implements EmployeeRepository {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly storageManager: StorageManager,
        private readonly hashService: HashService,
        private readonly avatarGenerator: AvatarGenerator,
        private readonly idGenerate: IdGenerator,
        private dataSource: DataSource,
    ) { }

    /**
     * Create a person and insert into database
     * @param createEmployeeDto JSON object to create person
     * @param creatorRole role of who evoke this function
     * @default creatorRole undefined
     * @param id set the id of person, if not set, id will be generated
     * @default id undefined
     * @returns inserted person
     */
    async create(
        createEmployeeDto: CreateEmployeeDto,
        id?: string,
    ): Promise<Employee> {

        const {
            front_identify_card_photo,
            back_identify_card_photo,
            profile_picture,
            ...rest
        } = createEmployeeDto;
        const profile = plainToInstance(Profile, rest);
        // let employee = this.employeeRepository.create(rest);
        let employee = new Employee();
        employee.id = "EMP" + this.idGenerate.generateId();
        if (id) employee.id = id;

        try {
            const frontPhoto = front_identify_card_photo as MemoryStoredFile;
            const backPhoto = front_identify_card_photo as MemoryStoredFile;
            const frontURL = await this.storageManager.upload(
                frontPhoto.buffer,
                "employee/" + employee.id + "/front_identify_card_photo_URL." + (frontPhoto.extension || "png"),
                frontPhoto.mimetype || "image/png",
            );

            const backURL = await this.storageManager.upload(
                back_identify_card_photo.buffer,
                "employee/" + employee.id + "/back_identify_card_photo_URL." + (backPhoto.extension || "png"),
                backPhoto.mimetype || "image/png",
            );

            let profilePictureURL: string | undefined = undefined;
            const avatarPhoto = createEmployeeDto.profile_picture;
            if (avatarPhoto) {
                profilePictureURL = await this.storageManager.upload(
                    avatarPhoto.buffer,
                    "employee/" + employee.id + "/avatarURL." + (avatarPhoto.extension || "png"),
                    avatarPhoto.mimetype || "image/png",
                );
            } else {
                const avatar = await this.avatarGenerator.generateAvatar(profile.name);
                profilePictureURL = await this.storageManager.upload(
                    avatar,
                    "employee/" + employee.id + "/avatarURL.svg",
                    "image/svg+xml",
                );
            }

            employee.profilePictureURL = profilePictureURL;
            profile.front_identify_card_photo_URL = frontURL;
            profile.back_identify_card_photo_URL = backURL;
            employee.profile = profile;
            return await this.employeeRepository.save(employee);
        } catch (error) {
            if (error instanceof TypeORMError) {
                try {
                    await this.storageManager.remove([
                        "/employee/" + employee.id + "/front_identify_card_photo_URL.png",
                        "/employee/" + employee.id + "/back_identify_card_photo_URL.png",
                    ]);
                } catch (removeError) {
                    console.error("An error occurred while removing files:", removeError);
                }
            }
            throw error;
        }
    }
    // async update(
    //     id: string,
    //     updateEmployeeDto: UpdateEmployeeDto,
    // ): Promise<Employee> {
    //     let employee = await this.employeeRepository.findOne({
    //         where: { id },
    //     });
    //     console.log(updateEmployeeDto)
    //     const { profile_picture, ...rest } =
    //         updateEmployeeDto;
    //     if (!employee) throw new NotFoundException();

    //     let profile = plainToInstance(Profile, rest);
    //     let avatarURL: string | undefined;

    //     if (profile_picture) {
    //         const avataPhoto = profile_picture as MemoryStoredFile;
    //         avatarURL = await this.storageManager.upload(
    //             avataPhoto.buffer,
    //             "employee/" +
    //             employee.id +
    //             "/avatarURL." +
    //             (avataPhoto.extension || "png"),
    //             avataPhoto.mimetype || "image/png",
    //         );
    //     } else {
    //         const avatar = await this.avatarGenerator.generateAvatar(
    //             profile.name,
    //         );
    //         avatarURL = await this.storageManager.upload(
    //             avatar,
    //             "employee/" + employee.id + "/avatarURL.svg",
    //             "image/svg+xml",
    //         );
    //     }

    //     employee.profile = profile;
    //     return await this.employeeRepository.save(employee);
    // }

    async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        const { profile_picture, ...rest } = updateEmployeeDto;
        let employee = await this.employeeRepository.findOne({
                    where: { id },
                });

                console.log(updateEmployeeDto)
     
        if (!employee) throw new NotFoundException();
        let profile = plainToInstance(Profile, rest);
        const queryRunner = this.dataSource.createQueryRunner();

        if (profile_picture) {
            try {
                await queryRunner.connect();
                await queryRunner.startTransaction();
                const imageURL = await this.storageManager.upload(
                    profile_picture.buffer,
                    `contract/${id}/${Date.now()}.` +
                        (profile_picture.extension || "png"),
                        profile_picture.mimetype || "image/png",
                );
                employee.profile = profile;
                employee.profilePictureURL = imageURL;
                employee = await this.employeeRepository.save(employee);
                await queryRunner.commitTransaction();
            } catch (error) {
                if (error instanceof TypeORMError) {
                    try {
                        await this.storageManager.remove([
                            `contract/${id}/${Date.now()}.` +
                                (profile_picture.extension || "png"),
                                profile_picture.mimetype || "image/png",
                        ]);
                    } catch (error) {
                        console.error(error);
                    }
                }
                throw error;
            } finally {
                await queryRunner.release();
            }
        }
        let result = await this.employeeRepository.update(
            { profile: profile },
            { ...employee },
        );

        return await isQueryAffected(result);
    }
    findOne(id: string): Promise<Employee | null> {
        return this.employeeRepository.findOne({
            where: {
                id,
            },
            cache: true,
        });
    }
    findAll(role?: PersonRole): Promise<Employee[]> {
        return this.employeeRepository.find({
            where: role ? {} : {},
            cache: true,
        });
    }

    // async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    //     let result = await this.employeeRepository.update(id, updateEmployeeDto as any);
    //     return isQueryAffected(result);
    // }
    async delete(id: string): Promise<boolean> {
        const result = await this.employeeRepository.softDelete({ id });
        return isQueryAffected(result);
    }

    async hardDelete?(id: any): Promise<boolean> {
        try {
            const result = await this.employeeRepository.delete({ id });
            return isQueryAffected(result);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

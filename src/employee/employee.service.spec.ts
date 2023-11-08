import { Test, TestingModule } from "@nestjs/testing";

import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Employee } from "./entities/employee.entity";
import { Account } from "../account/entities/account.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ResolveFnOutput } from "module";
import { StorageModule } from "../storage/storage.module";
import { HashModule } from "../hash/hash.module";
import { AvatarGeneratorModule } from "../avatar-generator/avatar-generator.module";
import multer from "multer";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { AccountService } from "../account/account.service";
import { CreateResidentDto } from "src/resident/dto/create-resident.dto";
describe("EmployeeController", () => {
        let service: EmployeeService;
        let accountService: AccountService;
        let employeeRepository: Repository<Employee>;

        const mockDeleteResult: DeleteResult = {
                raw: [],
                affected: 1,
        };
        const mockUpdateResult: UpdateResult = {
                raw: [],
                affected: 1,
                generatedMaps: [],
        };
        const mockEmployeeRepository = {
                softDelete: jest.fn().mockResolvedValue(mockUpdateResult),
        };
        const mockEmployee = {
                id: "employee",
                profile: {
                        date_of_birth: new Date(2022),
                        name: "vobinh",
                        gender: Gender.MALE,
                        phone_number: "0978754723",
                        front_identify_card_photo_URL: "employee/frontIdentifyPhoto.jpg",
                        back_identify_card_photo_URL: "employee/backIdentifyPhoto.jpg",
                },

        } as Employee;
        const RESIDENT_REPOSITORY_TOKEN = getRepositoryToken(Employee);

        beforeEach(async () => {
                const module: TestingModule = await Test.createTestingModule({
                        imports: [
                                ConfigModule.forRoot({ isGlobal: true }),
                                NestjsFormDataModule.config({
                                        isGlobal: true,
                                }),
                                TypeOrmModule.forRootAsync({
                                        useFactory: async () => {
                                                if (process.env.IS_PRODUCTION == "true") {
                                                        return {
                                                                type: "postgres",
                                                                url: process.env.DB_URL,
                                                                synchronize: true,
                                                                entities: ["dist/**/*.entity{.ts,.js}"],
                                                                cache: {
                                                                        duration: 5000,
                                                                        type: "redis",
                                                                        options: {
                                                                                url: process.env.REDIS_URL,
                                                                        },
                                                                },
                                                        };
                                                } else {
                                                        return {
                                                                type: "postgres",
                                                                url: process.env.DB_LOCAL_URL,
                                                                synchronize: true,
                                                                entities: ["dist/**/*.entity{.ts,.js}"],
                                                                duration: 5000,
                                                                cache: {
                                                                        type: "redis",
                                                                        options: {
                                                                                url: process.env.REDIS_LOCAL_URL,
                                                                        },
                                                                },
                                                        };
                                                }
                                        },
                                }),
                                TypeOrmModule.forFeature([Employee]),
                                IdGeneratorModule,
                                StorageModule,
                                HashModule,
                                AvatarGeneratorModule,

                        ],

                        providers: [EmployeeService],
                }).compile();
                employeeRepository = module.get<Repository<Employee>>(
                        RESIDENT_REPOSITORY_TOKEN,
                );

                service = module.get<EmployeeService>(EmployeeService);

        }, 30000);

        it("should be defined", () => {
                expect(service).toBeDefined();
        });
        it("should repository be defined", () => {
                expect(employeeRepository).toBeDefined();
        });
        describe("resident", () => {
                it("should find employee by id", async () => {
                        jest.spyOn(employeeRepository, "findOne").mockImplementation(
                                async () => mockEmployee,
                        );
                        const result = await service.findOne(mockEmployee.id);
                        expect(result).toEqual(mockEmployee);
                });
                it("should find all employee", async () => {
                        jest.spyOn(employeeRepository, "find").mockImplementation(
                                async () => [mockEmployee],
                        );
                        const result = await service.findAll();
                        expect(result).toEqual([mockEmployee]);
                });
                it("should create new employee with avatar photo", async () => {
                        jest.spyOn(employeeRepository, "create").mockImplementation(
                                (entityLike: DeepPartial<Employee>) => {
                                        const dto = entityLike as CreateEmployeeDto;
                                        return {
                                                id: "fdsfds",
                                                profile: {
                                                        date_of_birth: dto.date_of_birth,
                                                        name: dto.name,
                                                        gender: dto.gender,
                                                        phone_number: dto.phone_number,
                                                        front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                                                        back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg",
                                                },
                                                profilePictureURL: "resident/avatar.svg",
                                        } as Employee;
                                },
                        );
                        jest.spyOn(employeeRepository, "save").mockImplementation(
                                async (dto: Employee) => {
                                        return {
                                                id: "fdsfds",
                                                profile: {
                                                        date_of_birth: dto.profile.date_of_birth,
                                                        name: dto.profile.name,
                                                        gender: dto.profile.gender,
                                                        phone_number: dto.profile.phone_number,
                                                        front_identify_card_photo_URL:
                                                                "resident/frontIdentifyPhoto.jpg",
                                                        back_identify_card_photo_URL:
                                                                "resident/backIdentifyPhoto.jpg",
                                                },

                                        } as Employee;
                                },
                        );
                        const result = await service.create({
                                date_of_birth: new Date(2022),
                                name: "vobinh",
                                gender: Gender.MALE,
                                phone_number: "0978754723",
                                front_identify_card_photo: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three'),
                                } as MemoryStoredFile,

                                back_identify_card_photo: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three')
                                } as MemoryStoredFile,
                                profile_picture: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three')
                                } as MemoryStoredFile,
                        });
                        expect(result).toEqual({
                                id: expect.any(String),
                                profile: {
                                        date_of_birth: new Date(2022),
                                        name: "vobinh",
                                        gender: Gender.MALE,
                                        phone_number: "0978754723",
                                        front_identify_card_photo_URL:
                                                "resident/frontIdentifyPhoto.jpg",
                                        back_identify_card_photo_URL:
                                                "resident/backIdentifyPhoto.jpg",
                                },

                        });
                }, 30000);
                it("should create new employee with error photo", async () => {
                        jest.spyOn(employeeRepository, "create").mockImplementation(
                                (entityLike: DeepPartial<Employee>) => {
                                        const dto = entityLike as CreateEmployeeDto;
                                        return {
                                                id: "fdsfds",
                                                profile: {
                                                        date_of_birth: dto.date_of_birth,
                                                        name: dto.name,
                                                        gender: dto.gender,
                                                        phone_number: dto.phone_number,
                                                        front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                                                        back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg",
                                                },
                                                profilePictureURL: "resident/avatar.svg",
                                        } as Employee;
                                },
                        );
                        const err = new Error("Can not create employee");
                        jest.spyOn(employeeRepository, "save").mockRejectedValue(err)

                        await expect(service.create({
                                date_of_birth: new Date(2022),
                                name: "vobinh",
                                gender: Gender.MALE,
                                phone_number: "0978754723",
                                front_identify_card_photo: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three'),
                                } as MemoryStoredFile,

                                back_identify_card_photo: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three')
                                } as MemoryStoredFile,
                                profile_picture: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three')
                                } as MemoryStoredFile,
                        })).rejects.toThrow(err)
                }, 30000);

                it("should update", async () => {
                        const mockEmployeeId = "employee";
                        jest.spyOn(employeeRepository, 'update').mockResolvedValue(mockUpdateResult);

                        const result = await service.update(mockEmployeeId, {
                                front_identify_card_photo: new MemoryStoredFile(),
                                back_identify_card_photo: new MemoryStoredFile(),
                        });

                        expect(result).toEqual(mockEmployee);
                });


                it("should update success employee without avata photo", async () => {
                        jest.spyOn(employeeRepository, "findOne").mockImplementation(
                                async (id) => {
                                        return mockEmployee;
                                },
                        );
                        jest.spyOn(employeeRepository, "save").mockImplementation(
                                async (dto) => {
                                        return mockEmployee;
                                },
                        );

                        const result = await service.update("employee", {
                                phone_number: "0905091074",
                                front_identify_card_photo: new MemoryStoredFile,
                                back_identify_card_photo: new MemoryStoredFile
                        });

                        expect(result).toEqual(mockEmployee);
                });
                it("should update success employee with avata photo", async () => {
                        jest.spyOn(employeeRepository, "findOne").mockImplementation(
                                async (id) => {
                                        return mockEmployee;
                                },
                        );
                        jest.spyOn(employeeRepository, "save").mockImplementation(
                                async (dto) => {

                                        return mockEmployee;
                                },
                        );

                        const result = await service.updateResident("employee", {
                                phone_number: "0905091074",
                                avatar_photo: {
                                        mimetype: 'text/csv',
                                        buffer: Buffer.from('one,two,three')
                                } as MemoryStoredFile
                        });

                        expect(result).toEqual(mockEmployee);
                });

                it("should search employee", async () => {
                        jest.spyOn(employeeRepository, "find").mockImplementation(
                                async () => [mockEmployee],
                        );
                        const result = await service.search("binh");
                        expect(result).toEqual([mockEmployee]);
                });
                it("should delete success employee", async () => {
                        jest.spyOn(employeeRepository, "softDelete").mockImplementation(
                                async () => {
                                        return mockUpdateResult;
                                },
                        );
                        const result = await service.delete("resident");
                        expect(result).toEqual(mockUpdateResult);
                });
                it("should delete new employee fail ", async () => {
                        const err = new Error("Can not delete resident")
                        jest.spyOn(employeeRepository, "softDelete").mockRejectedValue(err);
                        await expect(service.delete).rejects.toThrow(err);
                });
        });
});

import { Test, TestingModule } from "@nestjs/testing";

import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Resident } from "./entities/resident.entity";
import { Account } from "../account/entities/account.entity";
import { ResidentController } from "./resident.controller";
import { ResidentService } from "./resident.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { CreateResidentDto } from "./dto/create-resident.dto";

describe("ResidentController", () => {
    let controller: ResidentController;
    let service: ResidentService;
    const mockDeleteResult: DeleteResult = {
        raw: [],
        affected: 1,
    };
    const mockUpdateResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
    };

    const mockResidentaHasAccount = {
        id: "resident",
        profile: {
            date_of_birth: new Date(2022),
            name: "vobinh",
            gender: Gender.MALE,
            phone_number: "0978754723",
            front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
            back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg",
        },
        account: {
            owner_id: "resident",
            email: "resident@gmail.com",
            password: "0978754723",
            avatarURL:
                "resident/avatar.svg",
                
            
        },
    } as Resident;
    const mockResidentService = {
        findAll: jest.fn().mockImplementation(() => [mockResidentaHasAccount]),
        create: jest.fn().mockImplementation((dto:CreateResidentDto) => {
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
                account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: dto.phone_number,
                    avatarURL:"resident/avatar.svg",
                        
                    
                },
            };
        }),
        findOne: jest.fn().mockImplementation((id) => mockResidentaHasAccount),
        updateResident: jest.fn().mockImplementation((id, dto) => {
            return {
                id: "resident",
                profile: {
                    date_of_birth: mockResidentaHasAccount.profile.date_of_birth,
                    name: mockResidentaHasAccount.profile.name,
                    gender: mockResidentaHasAccount.profile.gender,
                    phone_number: dto.phone_number,
                    front_identify_card_photo_URL:mockResidentaHasAccount.profile.front_identify_card_photo_URL,
                    back_identify_card_photo_URL: mockResidentaHasAccount.profile.back_identify_card_photo_URL,
                },
                account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: "0978754723",
                    avatarURL:"resident/avatar.svg",
                },
            }
        }),
        search: jest.fn().mockImplementation((query) => [mockResidentaHasAccount]),
        delete: jest.fn().mockImplementation((id) => {
            return mockUpdateResult;
        }),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
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
                TypeOrmModule.forFeature([Resident, Account]),
                IdGeneratorModule,
                Repository<Resident>,
            ],
            controllers: [ResidentController],
            providers: [ResidentService],
        })
            .overrideProvider(ResidentService)
            .useValue(mockResidentService)
            .compile();
        controller = module.get<ResidentController>(ResidentController);
    }, 30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    describe("resident", () => {
        it("should find resident by id", async () => {
            const result = await controller.findOne(mockResidentaHasAccount.id);
            expect(mockResidentService.findOne).toHaveBeenCalledWith(
                mockResidentaHasAccount.id
            );
            expect(result).toEqual(mockResidentaHasAccount);
        });
        it("should not find resident by id", async () => {
            const err = new Error("Resident not found");
            jest.spyOn(mockResidentService, "findOne").mockRejectedValue(err);
            await expect(controller.findOne("")).rejects.toThrow(err);
        });
        it("should find all resident", async () => {
            const result = await controller.findAll();
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual([mockResidentaHasAccount]);
            expect(mockResidentService.findAll).toHaveBeenCalled();
        });
        it("should create new resident", async () => {
            const result = await controller.create({
                    date_of_birth: new Date(2022),
                    name: "vobinh",
                    gender: Gender.MALE,
                    phone_number: "0978754723",
                    front_identify_card_photo: new MemoryStoredFile(),
                    back_identify_card_photo: new MemoryStoredFile(),
            });
            expect(result).toEqual({
                id: expect.any(String),
                profile: {
                    date_of_birth: new Date(2022),
                    name: "vobinh",
                    gender: Gender.MALE,
                    phone_number: "0978754723",
                    front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                    back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg",
                },
                account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: "0978754723",
                    avatarURL:
                        "resident/avatar.svg",
                },
            });
        });
        it("should update success resident", async () => {
            const result = await controller.updateResident("resident", {
                phone_number: "0905091074",
            });
            expect(result).toEqual({
                id: "resident",
                profile: {
                    date_of_birth: mockResidentaHasAccount.profile.date_of_birth,
                    name: mockResidentaHasAccount.profile.name,
                    gender: mockResidentaHasAccount.profile.gender,
                    phone_number: "0905091074",
                    front_identify_card_photo_URL:mockResidentaHasAccount.profile.front_identify_card_photo_URL,
                    back_identify_card_photo_URL: mockResidentaHasAccount.profile.back_identify_card_photo_URL,
                },
                account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: "0978754723",
                    avatarURL:"resident/avatar.svg",
                },
            });
        });
        it("should update resident fail because id not found", async () => {
            const mError = new Error("Resident not found");
            jest.spyOn(mockResidentService, "updateResident").mockRejectedValue(mError);
            await expect(controller.updateResident).rejects.toThrow(mError);
        });
        it("should search resident", async () => {
            const result = await controller.searchResident("binh");
            expect(result).toEqual([mockResidentaHasAccount]);
        });
        it("should delete success resident", async () => {
            const result = await controller.softDeleteResident("resident");
            expect(result).toEqual(mockUpdateResult);
        });
        it("should delete fail resident", async () => {
            const mError = new Error("Resident not found to delete");
            jest.spyOn(mockResidentService, "delete").mockRejectedValue(mError);
            await expect(controller.softDeleteResident("")).rejects.toThrow(
                mError,
            );
        });
    });
});

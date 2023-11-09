import { MeController } from "./../me/me.controller";
import { ApartmentService, ApartmentServiceImp } from "./apartment.service";
import { ApartmentController } from "./apartment.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeORMTestingModule } from "../../test-utils/TypeORMTestingModule";
import { Apartment } from "./entities/apartment.entity";
import { Floor } from "../floor/entities/floor.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import {
        BadRequestException,
        INestApplication,
        NotFoundException,
} from "@nestjs/common";
import { AppModule } from "../app.module";
import { faker, id_ID } from "@faker-js/faker";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { mock } from "node:test";
import { CreateAccountDto } from "src/account/dto/create-account.dto";
import { promiseHooks } from "v8";
import { error } from "console";
import { Resident } from "../resident/entities/resident.entity";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { JwtModule } from "@nestjs/jwt";
describe("ApartmentService", () => {
        let service: ApartmentService;
        let AparmentRepository: Repository<Apartment>;
        const mockAparmentservice = {
                findAll: jest.fn().mockImplementation(() => [mockAparment]),
                create: jest.fn().mockImplementation((dto) => {
                        return {
                                building_id: "BLD1",
                                max_floor: dto.max_floor,
                                name: dto.name,
                                apartment_id: "fdvs",
                                width: dto.width,
                                length: dto.length,
                                number_of_bedroom: dto.number_of_bedroom,
                                number_of_bathroom: dto.number_of_bathroom,
                                rent: dto.rent,
                                description: "string",
                                floor_id: "FLR1",
                        };
                }),
                findOne: jest.fn().mockImplementation((id) => mockAparment),
                update: jest.fn().mockImplementation((id, dto) => {
                        return mockUpdateResult;
                }),
                search: jest.fn().mockImplementation((query) => [mockAparment]),
                delete: jest.fn().mockImplementation((id) => {
                        return mockUpdateResult;
                }),
        };
        const mockAparment = {
                apartment_id: "APM3",
                width: 20,
                length: 20,
                number_of_bedroom: 2,
                number_of_bathroom: 2,
                rent: 5000000,
                description: "string",
                floor_id: "FLR1",
                building_id: "BLD1",
                name: "Aparment 3",
        } as Apartment;
        const mockUpdateResult: UpdateResult = {
                raw: [],
                affected: 1,
                generatedMaps: [],
        };
        const APARTMENT_REPOSITORY_TOKEN = getRepositoryToken(Apartment);
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
                                TypeOrmModule.forFeature([Apartment, Resident]),
                                IdGeneratorModule,
                                AuthModule,
                                StorageModule,
                                JwtModule,
                        ],
                        providers: [ApartmentServiceImp, {
                                provide: ApartmentService,
                                useValue: mockAparmentservice,
                                // useValue: {
                                //   find: jest.fn().mockResolvedValue([]),
                                //   findOne: jest.fn().mockResolvedValue(new Employee()),
                                //   findAll: jest.fn().mockResolvedValue([new Employee()]),
                                //   create: jest.fn().mockResolvedValue(new Employee()),
                                //   updateEmployee: jest.fn().mockResolvedValue(new Employee()),
                                //   delete: jest.fn().mockResolvedValue({ affected: 1 }),

                                // },
                        },],
                }).compile();
                AparmentRepository = module.get<Repository<Apartment>>(
                        APARTMENT_REPOSITORY_TOKEN,
                );
                service = module.get<ApartmentService>(ApartmentService);
        }, 50000);
        it("should service be defined", () => {
                expect(service).toBeDefined();
        });
        it("should repository be defined", () => {
                expect(AparmentRepository).toBeDefined();
        });
        describe("Aparment", () => {
                it("should find Aparment by id", async () => {
                        jest.spyOn(AparmentRepository, "findOne").mockImplementation(
                                async () => mockAparment,
                        );
                        const result = await service.findOne(mockAparment.apartment_id);
                        console.log(result);
                        expect(result).toEqual(mockAparment);
                });
                it("should find Apartment by page", async () => {
                        jest.spyOn(AparmentRepository, "findOne").mockImplementation(
                                async () => mockAparment,
                        );
                        const result = await service.findAll(1);
                        console.log(result);
                        expect(result).toEqual([mockAparment]);
                });
                it("should find all Aparment", async () => {
                        jest.spyOn(AparmentRepository, "find").mockImplementation(
                                async () => [mockAparment],
                        );
                        const result = await service.findAll();
                        console.log(result);
                        expect(result).toEqual([mockAparment]);
                });
                describe("Create", () => {
                        it("should create new Aparment", async () => {
                                jest.spyOn(AparmentRepository, "create").mockImplementation(
                                        (dto) => {
                                                return {
                                                        apartment_id: faker.string.binary(),
                                                        building_id: "BLD1",
                                                        name: dto.name,
                                                        width: dto.width,
                                                        length: dto.length,
                                                        number_of_bedroom: dto.number_of_bedroom,
                                                        number_of_bathroom: dto.number_of_bathroom,
                                                        rent: dto.rent,
                                                        description: "string",
                                                        floor_id: "FLR1",

                                                } as Apartment;
                                        },
                                );

                                const result = await service.create({
                                        building_id: mockAparment.building_id,
                                        name: mockAparment.name,
                                        width: mockAparment.width,
                                        length: mockAparment.length,
                                        number_of_bedroom: mockAparment.number_of_bedroom,
                                        number_of_bathroom: mockAparment.number_of_bathroom,
                                        rent: mockAparment.rent,
                                        description: mockAparment.description,
                                        floor_id: mockAparment.floor_id,
                                        images: []
                                });
                                expect(result).toEqual({
                                        apartment_id: expect.any(String),
                                        building_id: mockAparment.building_id,
                                        name: mockAparment.name,
                                        width: mockAparment.width,
                                        length: mockAparment.length,
                                        number_of_bedroom: mockAparment.number_of_bedroom,
                                        number_of_bathroom: mockAparment.number_of_bathroom,
                                        rent: mockAparment.rent,
                                        description: mockAparment.description,
                                        floor_id: mockAparment.floor_id,
                                        images: [],
                                        max_floor: mockAparment.max_floor,
                                });
                        });
                        describe("Update", () => {
                                it("should create new building fail", async () => {
                                        const err = new BadRequestException("Create fail");
                                        jest.spyOn(service, "create").mockRejectedValue(err);
                                        await expect(service.create).rejects.toThrow(err);
                                });
                        });
                        it("should update success building", async () => {
                                jest.spyOn(AparmentRepository, "update").mockImplementation(
                                        async () => {
                                                return mockUpdateResult;
                                        },
                                );
                                const result = await service.update("BLD3", mockAparment);
                                expect(result).toEqual(mockUpdateResult);
                        });
                        it("should update building fail because id not found", async () => {
                                try {
                                        const result = await service.update("", mockAparment);
                                } catch (e) {
                                        expect(e.message).toBe("Id not found.");
                                }
                        });

                });
        });
});

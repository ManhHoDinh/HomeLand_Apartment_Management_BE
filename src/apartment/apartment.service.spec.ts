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
import { Repository, UpdateResult, DeleteResult, DataSource } from "typeorm";
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
import { IdGenerator } from "src/id-generator/id-generator.service";
describe("ApartmentService", () => {
    let service: ApartmentServiceImp;
    let ApartmentRepository: Repository<Apartment>;
    const mockApartmentService = {
        findAll: jest.fn().mockImplementation(() => [mockApartment]),
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
        findOne: jest.fn().mockImplementation(() => mockApartment),
        update: jest.fn().mockImplementation(() => {
            return mockUpdateResult;
        }),
        search: jest.fn().mockImplementation((query) => [mockApartment]),
        delete: jest.fn().mockImplementation((id) => {
            return mockUpdateResult;
        }),
    };
    const mockApartment = {
        apartment_id: "APM3",
        width: 20,
        length: 20,
        number_of_bedroom: 2,
        number_of_bathroom: 2,
        rent: 5000000,
        description: "string",
        floor_id: "FLR1",
        building_id: "BLD1",
        name: "Apartment 3",
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
                Repository<Resident>,
                IdGeneratorModule,
                Repository<Apartment>,
            ],
            providers: [ApartmentServiceImp],
        }).compile();

        ApartmentRepository = module.get<Repository<Apartment>>(
            APARTMENT_REPOSITORY_TOKEN,
        );
        service = module.get<ApartmentServiceImp>(ApartmentServiceImp);
    }, 50000);
    it("should service be defined", () => {
        expect(service).toBeDefined();
    });
    it("should repository be defined", () => {
        expect(ApartmentRepository).toBeDefined();
    });
    describe("Delete", () => {
        it("should delete success apartment", async () => {
            jest.spyOn(ApartmentRepository, "softDelete").mockImplementation(
                async () => {
                    return mockUpdateResult;
                },
            );
            const result = await service.delete("BLD3");
            expect(result).toEqual(mockUpdateResult);
        });
    });
    describe("find", () => {
        it("should return all apartments", async () => {
            const apartments = [
                {
                    apartment_id: "APM3",
                    building_id: "BLD1",
                    description: "string",
                    floor_id: "FLR1",
                    length: 20,
                    name: "Apartment 3",
                    number_of_bathroom: 2,
                    number_of_bedroom: 2,
                    rent: 5000000,
                    width: 20,
                },
            ];
            jest.spyOn(ApartmentRepository, "find").mockResolvedValue(
                mockApartmentService.findAll(),
            );

            const result = await service.findAll();

            expect(result).toEqual(mockApartmentService.findAll());
        });

        it("should return all apartments by page", async () => {
            const apartments = [
                {
                    apartment_id: "APM3",
                    building_id: "BLD1",
                    description: "string",
                    floor_id: "FLR1",
                    length: 20,
                    name: "Apartment 3",
                    number_of_bathroom: 2,
                    number_of_bedroom: 2,
                    rent: 5000000,
                    width: 20,
                },
            ];
            const apartmentFindSpy = jest
                .spyOn(ApartmentRepository, "find")
                .mockResolvedValue(mockApartmentService.findAll());

            const result = await service.findAll(1);

            expect(result).toEqual(mockApartmentService.findAll());
        });
        it("should find Apartment by id", async () => {
            jest.spyOn(ApartmentRepository, "findOne").mockImplementation(
                async () => mockApartment,
            );
            const result = await service.findOne(mockApartment.apartment_id);
            expect(result).toEqual(mockApartment);
        });
    });
    describe("Create", () => {
        it("should create new Apartment", async () => {
            jest.spyOn(ApartmentRepository, "create").mockImplementation(
                (dto) => {
                    return {
                        apartment_id: dto.apartment_id,
                        building_id: dto.building_id,
                        name: dto.name,
                        width: dto.width,
                        length: dto.length,
                        number_of_bedroom: dto.number_of_bedroom,
                        number_of_bathroom: dto.number_of_bathroom,
                        rent: dto.rent,
                        description: dto.description,
                        floor_id: dto.floor_id,
                    } as Apartment;
                },
            );
            jest.spyOn(ApartmentRepository, "save").mockImplementation(
                async (dto) => {
                    return {
                        apartment_id: dto.apartment_id,
                        building_id: dto.building_id,
                        name: dto.name,
                        width: dto.width,
                        length: dto.length,
                        number_of_bedroom: dto.number_of_bedroom,
                        number_of_bathroom: dto.number_of_bathroom,
                        rent: dto.rent,
                        description: dto.description,
                        floor_id: dto.floor_id,
                    } as Apartment;
                },
            );

            const result = await service.create({
                building_id: mockApartment.building_id,
                name: mockApartment.name,
                width: mockApartment.width,
                length: mockApartment.length,
                number_of_bedroom: mockApartment.number_of_bedroom,
                number_of_bathroom: mockApartment.number_of_bathroom,
                rent: mockApartment.rent,
                description: mockApartment.description,
                floor_id: mockApartment.floor_id,
                images: [],
            });
            expect(result).toEqual({
                apartment_id: expect.any(String),
                building_id: mockApartment.building_id,
                name: mockApartment.name,
                width: mockApartment.width,
                length: mockApartment.length,
                number_of_bedroom: mockApartment.number_of_bedroom,
                number_of_bathroom: mockApartment.number_of_bathroom,
                rent: mockApartment.rent,
                description: mockApartment.description,
                floor_id: mockApartment.floor_id,
                max_floor: mockApartment.max_floor,
            });
        });
        it("should create new building fail", async () => {
            const err = new BadRequestException("Create fail");
            jest.spyOn(service, "create").mockRejectedValue(err);
            await expect(service.create).rejects.toThrow(err);
        });
    });

    describe("Update", () => {
        it("should update success building", async () => {
            jest.spyOn(ApartmentRepository, "update").mockImplementation(
                async () => {
                    return mockUpdateResult;
                },
            );
            
            const result = await service.update(
                mockApartment.apartment_id,
                mockApartment,
            );
            expect(result).toEqual(true);
        });
        it("should update building fail because id not found", async () => {
            try {
                jest.spyOn(ApartmentRepository, "update")
                    .mockImplementation(async () => {
                        return mockUpdateResult;
                    })
                    .mockRejectedValue(new NotFoundException("Id not found."));
                expect(await service.update("", mockApartment)).rejects.toThrow(
                    new NotFoundException("Id not found."),
                );
            } catch (e) {
                expect(e.message).toBe("Id not found.");
            }
        });
    });
});

import { MeController } from "./../me/me.controller";
import { BuildingService, TypeORMBuildingService } from "./building.service";
import { BuildingController } from "./building.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeORMTestingModule } from "../../test-utils/TypeORMTestingModule";
import { Building } from "./entities/building.entity";
import { Floor } from "../floor/entities/floor.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { faker, id_ID } from "@faker-js/faker";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { mock } from "node:test";
import { CreateAccountDto } from "src/account/dto/create-account.dto";
import { promiseHooks } from "v8";

describe("BuildingController", () => {
    let service: TypeORMBuildingService;
    let app: INestApplication;
    const mockBuildingService = {
        create: jest.fn((dto) => {
            return {
                id: "fdff",
                ...dto,
            };
        }),
    };
    let buildingRepository: Repository<Building>;

    const mockBuilding = {
        building_id: "BLD4",
        max_floor: 0,
         name: "Building 3",
        address: "996 Daugherty Extension",
    } as Building;
    const addBuilding = {
        max_floor: 0,
        name: "Building 3",
        address: "996 Daugherty Extension",
    } as CreateBuildingDto;
    const mockDeleteResult: DeleteResult = {
        raw: [],
        affected: 1,
    };
    const mockUpdateResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
    };

    const BUILDING_REPOSITORY_TOKEN = getRepositoryToken(Building);
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
                TypeOrmModule.forFeature([Building, Floor]),
                IdGeneratorModule,
                Repository<Building>,
            ],
            providers: [TypeORMBuildingService],
        }).compile();

        buildingRepository = module.get<Repository<Building>>(
            BUILDING_REPOSITORY_TOKEN,
        );
        service = module.get<TypeORMBuildingService>(TypeORMBuildingService);
    }, 30000);
    it("should service be defined", () => {
        expect(service).toBeDefined();
    });
    it("should repository be defined", () => {
        expect(buildingRepository).toBeDefined();
    });
    describe("building", () => {
        it("should find building by id", async () => {
            jest.spyOn(buildingRepository, "findOne").mockImplementation(
                async () => mockBuilding,
            );
            const result = await service.findOne(mockBuilding.building_id);
            console.log(result);
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual(mockBuilding);
        });
        it("should find all building", async () => {
            jest.spyOn(buildingRepository, "find").mockImplementation(
                async () => [mockBuilding],
            );
            const result = await service.findAll();
            console.log(result);
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual([mockBuilding]);
        });
    });
    it("should create new building", async () => {
        jest.spyOn(buildingRepository, "create").mockImplementation((dto) => {
            return {
                building_id: faker.string.binary(),
                name: dto.name,
                max_floor: dto.max_floor,
                address: dto.address,
            } as Building;
        });
        jest.spyOn(buildingRepository, "save").mockImplementation(
            async (dto) => {
                return {
                    building_id: faker.string.binary(),
                    name: dto.name,
                    max_floor: dto.max_floor,
                    address: dto.address,
                } as Building;
            },
        );
        const result = await service.create({
            name: mockBuilding.name,
            max_floor: mockBuilding.max_floor,
            address: mockBuilding.address,
        });
        expect(result).toEqual({
            building_id: expect.any(String),
            name: mockBuilding.name,
            max_floor: mockBuilding.max_floor,
            address: mockBuilding.address,
        });
    });
    it("should create new building fail", async () => {
        try {
            const result = await service.create({
                name: mockBuilding.name,
                max_floor: mockBuilding.max_floor,
                address: mockBuilding.address,
            });
        } catch (err) {
            expect(err.message).toBe('No metadata for "Building" was found.');
        }
    });

    it("should update success building", async () => {
        jest.spyOn(buildingRepository, "update").mockImplementation(
            async () => {
                return mockUpdateResult;
            },
        );
        const result = await service.update("BLD3", mockBuilding);
        expect(result).toEqual(mockUpdateResult);
    });
    it("should update building fail because id not found", async () => {
        try {
            const result = await service.update("", mockBuilding);
        } catch (e) {
            expect(e.message).toBe("Id not found.");
        }
    });
    it("should search building", async () => {
        jest.spyOn(buildingRepository, "find").mockImplementation(async () => [
            mockBuilding,
        ]);
        const result = await service.search("binh");
        expect(result).toEqual([mockBuilding]);
    });
});

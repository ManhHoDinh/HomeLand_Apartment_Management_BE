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
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";

describe("BuildingController", () => {
    let controller: BuildingController;
    let service: TypeORMBuildingService;
    const mockDeleteResult: DeleteResult = {
        raw: [],
        affected: 1,
    };
    const mockUpdateResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
    };
    const mockBuilding = {
        building_id: "BLD3",
        max_floor: 0,
        name: "Building 3",
        address: "996 Daugherty Extension",
    } as Building;
    const mockBuildingService = {
        findAll: jest.fn().mockImplementation(() => [mockBuilding]),
        create: jest.fn().mockImplementation((dto) => {
            return {
                building_id: "fdvs",
                max_floor: dto.max_floor,
                name: dto.name,
                address: dto.address,
            };
        }),
        findOne: jest.fn().mockImplementation((id) => mockBuilding),
        update: jest.fn().mockImplementation((id, dto) => {
            return mockUpdateResult;
        }),
        search: jest.fn().mockImplementation((query) => [mockBuilding]),
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
                TypeOrmModule.forFeature([Building, Floor]),
                IdGeneratorModule,
                Repository<Building>,
            ],
            controllers: [BuildingController],
            providers: [TypeORMBuildingService],
        })
            .overrideProvider(TypeORMBuildingService)
            .useValue(mockBuildingService)
            .compile();
        controller = module.get<BuildingController>(BuildingController);
    }, 30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    describe("building", () => {
        it("should find building by id", async () => {
            const result = await controller.findOne(mockBuilding.building_id);
            expect(mockBuildingService.findOne).toHaveBeenCalledWith(
                mockBuilding.building_id,
            );
            expect(result).toEqual(mockBuilding);
        });
        it("should not find building by id", async () => {
            const err = new Error("Building not found");
            jest.spyOn(mockBuildingService, "findOne").mockRejectedValue(err)
           await expect(controller.findOne("")).rejects.toThrow(err)
        });
        it("should find all building", async () => {
            const result = await controller.findAll();
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual([mockBuilding]);
            expect(mockBuildingService.findAll).toHaveBeenCalled();
        });
        it("should create new building", async () => {
            const result = await controller.create({
                max_floor: 0,
                name: "Building 3",
                address: "996 Daugherty Extension",
            });
            expect(result).toEqual({
                building_id: expect.any(String),
                max_floor: 0,
                name: "Building 3",
                address: "996 Daugherty Extension",
            });
        });
        it("should update success building", async () => {
            const result = await controller.update("BLD3", {
                max_floor: 0,
                name: "Building 3",
                address: "996 Daugherty Extension",
            });
            expect(result).toEqual(mockUpdateResult);
        });
        it("should update building fail because id not found", async () => {
            const mError = new Error("Building not found");
            jest.spyOn(mockBuildingService,"update").mockRejectedValue(mError)
           await expect(controller.update).rejects.toThrow(mError);
        });
        it("should search building", async () => {
            const result = await controller.searchBuilding("binh");
            expect(result).toEqual([mockBuilding]);
        });
        it("should delete success building", async () => {
            const result = await controller.softDeleteBuilding("BLD3");
            expect(result).toEqual(mockUpdateResult);
        });
        it("should delete fail building", async () => {
            const mError = new Error("Building not found to delete");
            jest.spyOn(mockBuildingService,"delete").mockRejectedValue(mError)
           await expect(controller.softDeleteBuilding("")).rejects.toThrow(mError);
        });
    });
});

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
import { Repository } from "typeorm";
import { INestApplication } from "@nestjs/common";

describe("BuildingController", () => {
    let controller: BuildingController;
    let service: TypeORMBuildingService;
    let app: INestApplication;
    const mockBuildingService = {
        create: jest.fn((dto) => {
            return {
                ...dto,
            };
        }),
    };
    let buildingRepository:Repository<Building>
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
            ],
            controllers: [BuildingController],
            providers: [TypeORMBuildingService, {
                provide: getRepositoryToken(Building),
                useValue: {
                    create: jest.fn(),
                    findAll: jest.fn()
                }
            }],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        controller = module.get<BuildingController>(BuildingController);
        buildingRepository =module.get(BUILDING_REPOSITORY_TOKEN);
        service = module.get<TypeORMBuildingService>(TypeORMBuildingService);
    },30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    it("should repository be defined", () => {
        expect(buildingRepository).toBeDefined();
    });
   
    // it("should be get all building", () => {
    //     const dto =new CreateBuildingDto();
    //     dto.address="df";
    //     dto.name = "binhhh",
    //     dto.max_floor=11;
    //     expect(controller.create(dto)).toEqual({
    //         id: expect.any(String),
    //         name: dto.name,
    //         max_floor:dto.max_floor,
    //         address: dto.address
    //     })
    // })
});

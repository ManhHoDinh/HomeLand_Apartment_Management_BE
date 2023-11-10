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
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Resident } from "../resident/entities/resident.entity";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { JwtModule } from "@nestjs/jwt";
describe("ApartmentController", () => {
        let controller: ApartmentController;
        let service: ApartmentServiceImp;
        const mockDeleteResult: DeleteResult = {
                raw: [],
                affected: 1,
        };
        
        const mockUpdateResult: UpdateResult = {
                raw: [],
                affected: 1,
                generatedMaps: [],
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
        beforeAll(async () => {
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
                                // Repository<Apartment>,
                        ],
                        controllers: [ApartmentController],
                        providers: [ApartmentServiceImp,{
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
                })
                        .overrideProvider(ApartmentServiceImp)
                        .useValue(mockAparmentservice)
                        .compile();
                controller = module.get<ApartmentController>(ApartmentController);
        }, 30000);
        it("should be defined", () => {
                expect(controller).toBeDefined();
        });
        describe("apartment", () => {
                it("should create new apartment", async () => {
                        const mockCreatedApartment = {
                          apartment_id: "APM3",
                          building_id: "BLD1",
                          description: "string",
                          floor_id: "FLR1",
                          length: 20,
                          name: "Aparment 3",
                          number_of_bathroom: 2,
                          number_of_bedroom: 2,
                          rent: 5000000,
                          width: 20,
                        };
                        jest.spyOn(mockAparmentservice, 'create').mockResolvedValue(mockCreatedApartment);
                      
                        const result = await controller.create({
                          width: 20,
                          length: 20,
                          number_of_bedroom: 2,
                          number_of_bathroom: 2,
                          rent: 5000000,
                          description: "string",
                          floor_id: "FLR1",
                          building_id: "BLD1",
                          name: "Aparment 3",
                          images: []
                        });
                      
                        expect(result).toEqual(mockCreatedApartment);
                      });
                      it("should update success apartment", async () => {
                        const mockUpdatedApartment = {
                          apartment_id: "APM3",
                          building_id: "BLD1",
                          description: "string",
                          floor_id: "FLR1",
                          length: 20,
                          name: "Aparment 3",
                          number_of_bathroom: 2,
                          number_of_bedroom: 2,
                          rent: 5000000,
                          width: 20,
                        };
                        jest.spyOn(mockAparmentservice, 'update').mockResolvedValue(mockUpdatedApartment);
                      
                        const result = await controller.update("APM3", {
                          width: 20,
                          length: 20,
                          number_of_bedroom: 2,
                          number_of_bathroom: 2,
                          rent: 5000000,
                          description: "string",
                          floor_id: "FLR1",
                          building_id: "BLD1",
                          name: "Aparment 3",
                          images: []
                        });
                      
                        expect(result).toEqual(mockUpdatedApartment);
                      });
                      it("should update apartment fail because id not found", async () => {
                        const mError = new Error("apartment not found");
                        jest.spyOn(mockAparmentservice, "update").mockRejectedValue(mError);
                        await expect(controller.update("APM3", {})).rejects.toThrow(mError);
                      });
                it("should find apartment by id", async () => {
                        const result = await controller.findOne(mockAparment.apartment_id);
                        expect(mockAparmentservice.findOne).toHaveBeenCalledWith(
                                mockAparment.apartment_id,
                        );
                        expect(result).toEqual(mockAparment);
                });
                it("should not find aparment by id", async () => {
                        const err = new NotFoundException("Apartment not found");;
                        jest.spyOn(mockAparmentservice, "findOne").mockRejectedValue(err)
                        await expect(controller.findOne("in-valid")).rejects.toThrow(err)
                });
                it("should find all apartment", async () => {
                        const result = await controller.findAll(1);
                        expect(result).toEqual([mockAparment]);
                });
        });
});


import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { MeController } from "./me.controller";
import { Resident } from "../resident/entities/resident.entity";
import { Admin } from "../admin/entities/admin.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";

describe("MeService", () => {
    let controller: MeController;
    const mockMe = {
        id: "",
        contracts: {},
        profile: {},
        created_at: new Date(),
        account: {},
        account_id: "123",
    } as Resident | Admin | Manager | Technician;
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
                AuthModule,
                JwtModule,
            ],
            controllers: [MeController],
        }).compile();
        controller = module.get<MeController>(MeController);
    }, 30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("get Me", () => {
        it("should find Me by id", async () => {
            jest.spyOn(controller, "getPersonalInfo").mockImplementation(
                () => mockMe,
            );
            const result = controller.getPersonalInfo("1");
            expect(result).toEqual(mockMe);
        });
    });
});

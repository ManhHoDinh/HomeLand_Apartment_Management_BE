import { Test, TestingModule } from "@nestjs/testing";
import { SeedService } from "./seed.service";
import { DataSource } from "typeorm";
import { StorageManager } from "../storage/storage.service";
import { IdGenerator } from "../id-generator/id-generator.service";
import { HashService } from "../hash/hash.service";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { ApartmentService } from "../apartment/apartment.service";
import { ResidentService } from "../resident/resident.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Seed } from "./seed.controller";
import { ApartmentModule } from "../apartment/apartment.module";
import { ResidentModule } from "../resident/resident.module";
import { HashModule } from "../hash/hash.module";
import { AvatarGeneratorModule } from "../avatar-generator/avatar-generator.module";
import { EmployeeModule } from "../employee/employee.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

describe("SeedService", () => {
    let seedService: SeedService;
    let dataSource: DataSource;
    let storageManager: StorageManager;
    let idGenerator: IdGenerator;
    let hashService: HashService;
    let avatarGenerator: AvatarGenerator;
    let apartmentService: ApartmentService;
    let residentService: ResidentService;

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
                ApartmentModule,
                ResidentModule,
                StorageModule,
                IdGeneratorModule,
                HashModule,
                AvatarGeneratorModule,
                EmployeeModule,
                AuthModule,
                StorageModule,
                JwtModule,
            ],

            providers: [
                SeedService,
                {
                    provide: DataSource,
                    useValue: {},
                },
                Seed,
                {
                    provide: StorageManager,
                    useValue: {},
                },
            ],
        }).compile();

        seedService = module.get<SeedService>(SeedService);
        dataSource = module.get<DataSource>(DataSource);
        storageManager = module.get<StorageManager>(StorageManager);
        idGenerator = module.get<IdGenerator>(IdGenerator);
        hashService = module.get<HashService>(HashService);
        avatarGenerator = module.get<AvatarGenerator>(AvatarGenerator);
        apartmentService = module.get<ApartmentService>(ApartmentService);
        residentService = module.get<ResidentService>(ResidentService);
    });

    afterEach(async () => {
        await dataSource.destroy();
    });
    it("should be defined", () => {
        expect(seedService).toBeDefined();
        expect(dataSource).toBeDefined();
        expect(storageManager).toBeDefined();
    });
    // describe("startSeeding", () => {
    //     it("should start seeding", async () => {
    //         const result = await service.startSeeding();
    //         expect(result).toEqual({ msg: "Seeding started" });
    //     });
    // });
    describe("dropDB", () => {
        it("should call destroyStorage on the storageManager", async () => {
            const destroyStorageSpy = jest
                .spyOn(storageManager, "destroyStorage")
                .mockImplementation();

            await seedService.dropDB();

            expect(destroyStorageSpy).toHaveBeenCalled();
        });

        it("should call dropDatabase on the dataSource", async () => {
            const dropDatabaseSpy = jest
                .spyOn(dataSource, "dropDatabase")
                .mockImplementation();

            await seedService.dropDB();

            expect(dropDatabaseSpy).toHaveBeenCalled();
        });
    });

    describe("createDB", () => {
        it("should call initiateStorage and synchronize", async () => {
            const initiateStorageSpy = jest
                .spyOn(storageManager, "initiateStorage")
                .mockImplementation();
            const synchronizeSpy = jest
                .spyOn(dataSource, "synchronize")
                .mockImplementation();

            await seedService.createDB();

            expect(initiateStorageSpy).toHaveBeenCalled();
            expect(synchronizeSpy).toHaveBeenCalled();
        });

        it("should handle errors and rethrow them", async () => {
            const error = new Error("Test Error");
            jest.spyOn(storageManager, "initiateStorage").mockRejectedValue(
                error,
            );

            try {
                await seedService.createDB();
            } catch (e) {
                expect(e).toBe(error);
            }
        });
    });
});

import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { Resident } from "../resident/entities/resident.entity";
import { Admin } from "../admin/entities/admin.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
import { TokenController } from "./token.controller";
import { NestjsFormDataModule } from "nestjs-form-data";
import { AuthService } from "../auth/auth.service";
import { SignInDto } from "../auth/dto/signin.dto";
import { PersonRole } from "../helper/class/profile.entity";

describe("TokenService", () => {
    let controller: TokenController;
    const mockToken = "Token is valid";
    let service: AuthService;
    const mockSignIn = {
        email: "manh@gmail.com",
        password: "password",
    } as SignInDto;
    const signInResult = {
        role: PersonRole.ADMIN,
        access_token: "avasa",
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
                AuthModule,
                JwtModule,
            ],
            controllers: [TokenController],
        }).compile();
        controller = module.get<TokenController>(TokenController);
    }, 30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("get Token", () => {
        it("should find Token by id", async () => {
            jest.spyOn(controller, "validateToken").mockImplementation(
                () => mockToken,
            );
            const result = controller.validateToken();
            expect(result).toEqual(mockToken);
        });
    });
    describe("getExiredToken ", () => {
        it("should find Token by id", async () => {
            jest.spyOn(controller, "getExiredToken").mockImplementation(
                () => Promise.resolve(signInResult),
            );
            const result = await controller.getExiredToken(mockSignIn);
            expect(result).toEqual(signInResult);
        });
    });
});

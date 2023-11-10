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
import { AuthService, AuthServiceImp } from "../auth/auth.service";
import { SignInDto } from "../auth/dto/signin.dto";
import { Gender, PersonRole } from "../helper/class/profile.entity";
import { Account } from "../account/entities/account.entity";
import { AccountService } from "../account/account.service";
import { HashModule } from "../hash/hash.module";
import { JWTAuthGuard } from "../auth/guard/jwt-auth.guard";
import { HashService } from "../hash/hash.service";

describe("TokenService", () => {
    let controller: TokenController;
    const mockToken = "Token is valid";
    let accountRepository: Repository<Account>
    let service: AuthServiceImp;
    let hashSerVice : HashService
    let jwtSerVice : JwtService
    const mockSignIn = {
        email: "resident@gmail.com",
        password: "password",
    } as SignInDto;
    const signInResult = {
        access_token: "abc",
        role: PersonRole.RESIDENT,
    };
    const mockResident = {
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
            password: "password",
            avatarURL: "resident/avatar.svg",
        },
        role: PersonRole.RESIDENT
    } as Resident;
    const mockAccount = {
        owner_id: "resident",
        email: "resident@gmail.com",
        password: "password",
        resident: mockResident,
    } as Account;

    const ACCOUNT_REPOSITORY_TOKEN = getRepositoryToken(Account);
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
                TypeOrmModule.forFeature([Account]),
                Repository<Account>,
                AuthModule,
                JwtModule,
                HashModule
            ],
            controllers: [TokenController, AccountService, AuthServiceImp, JWTAuthGuard,
                JwtService],
        }).compile();
        controller = module.get<TokenController>(TokenController);
       service = module.get(AuthServiceImp)
    }, 30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("get Token", () => {
        it("should find Token by id", async () => {
            const result = controller.validateToken();
            expect(result).toEqual("Token is valid");
        });
    });
    describe("getExiredToken ", () => {
        it("should find Token by id", async () => {
            jest.spyOn(service, "signIn").mockImplementation(
                async() =>signInResult,
            );
            const result = await controller.getExiredToken(mockSignIn);
            expect(result).toEqual(signInResult);
        });
    });
});

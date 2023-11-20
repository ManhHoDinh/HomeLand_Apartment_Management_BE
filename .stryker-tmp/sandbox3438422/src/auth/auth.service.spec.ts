// @ts-nocheck
import { Test, TestingModule } from "@nestjs/testing";
import { Floor } from "../floor/entities/floor.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { Repository } from "typeorm";
import { Account } from "../account/entities/account.entity";
import { AuthServiceImp } from "./auth.service";
import { Resident } from "../resident/entities/resident.entity";
import { Gender, PersonRole } from "../helper/class/profile.entity";
import { AccountController } from "src/account/account.controller";
import { JwtService } from "@nestjs/jwt";
import { JWTAuthGuard } from "./guard/jwt-auth.guard";
import { ConfigModule } from "@nestjs/config";
import { AccountService } from "../account/account.service";
import { AccountModule } from "../account/account.module";
import { HashModule } from "../hash/hash.module";
import { ServerOpeningEvent } from "typeorm/browser";
import { HashService } from "../hash/hash.service";
import { UnauthorizedException } from "@nestjs/common";

describe("AccountService", () => {
    let service: AuthServiceImp;
    let accountRepository: Repository<Account>;
    let hashSerVice: HashService;
    let jwtSerVice: JwtService;
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
            password: "0978754723",
            avatarURL: "resident/avatar.svg",
        },
        role: PersonRole.RESIDENT,
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
                ConfigModule.forRoot({ isGlobal: true }),
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
                HashModule,
            ],
            providers: [
                AuthServiceImp,
                AccountService,
                JWTAuthGuard,
                JwtService,
            ],
        }).compile();
        accountRepository = module.get<Repository<Account>>(
            ACCOUNT_REPOSITORY_TOKEN,
        );
        service = module.get<AuthServiceImp>(AuthServiceImp);
        hashSerVice = module.get(HashService);
        jwtSerVice = module.get(JwtService);
    }, 50000);
    it("should service be defined", () => {
        expect(service).toBeDefined();
    });
    it("should repository be defined", () => {
        expect(accountRepository).toBeDefined();
    });
    describe("auth", () => {
        it("should find account by email", async () => {
            jest.spyOn(accountRepository, "findOne").mockImplementation(
                async () => mockAccount,
            );
            const result =
                await service.findOwnerByAccountEmail("abc@gmail.com");
            expect(result).toEqual(mockResident);
        });
        it("should not find account by email", async () => {
            jest.spyOn(accountRepository, "findOne").mockImplementation(
                async () => null,
            );
            const result =await service.findOwnerByAccountEmail("email");
            await expect(result).toEqual(
                null,
            );
        });
        it("should find account by id", async () => {
            jest.spyOn(accountRepository, "findOne").mockImplementation(
                async () => mockAccount,
            );
            const result = await service.findOwnerById("resident");
            expect(result).toEqual(mockResident);
        });
        it("should not find account by email", async () => {
            jest.spyOn(accountRepository, "findOne").mockRejectedValue(null);
            await expect(service.findOwnerById("")).rejects.toBe(null);
        });
        it("should sign in", async () => {
            jest.spyOn(accountRepository, "findOne").mockImplementation(
                async () => mockAccount,
            );
            jest.spyOn(hashSerVice, "isMatch").mockReturnValue(true);
            jest.spyOn(jwtSerVice, "sign").mockReturnValue("abc");
            const result = await service.signIn({
                email: "abc@gmail.com",
                password: PersonRole.RESIDENT,
            });
            expect(result).toEqual({
                access_token: "abc",
                role: PersonRole.RESIDENT,
            });
        });
        it("should sign in fail with not found person", async () => {
            const err = new UnauthorizedException("Wrong email or password");
            jest.spyOn(accountRepository, "findOne").mockRejectedValue(err);
            jest.spyOn(hashSerVice, "isMatch").mockReturnValue(true);
            jest.spyOn(jwtSerVice, "sign").mockReturnValue("abc");
            await expect(
                service.signIn({
                    email: "abc@gmail.com",
                    password: PersonRole.RESIDENT,
                }),
            ).rejects.toThrow(err);
        });
        it("should sign in fail with not found hash service false", async () => {
            const err = new UnauthorizedException("Wrong email or password");
            jest.spyOn(accountRepository, "findOne").mockImplementation(
                async () => mockAccount,
            );
            jest.spyOn(hashSerVice, "isMatch").mockReturnValue(false);
            jest.spyOn(jwtSerVice, "sign").mockReturnValue("abc");
            await expect(
                service.signIn({
                    email: "abc@gmail.com",
                    password: PersonRole.RESIDENT,
                }),
            ).rejects.toThrow(err);
        });
        it("should sign in fail with person not has account", async () => {
            const err = new UnauthorizedException("Wrong email or password");
            jest.spyOn(accountRepository, "findOne").mockImplementation(
                async () => null,
            );
            jest.spyOn(hashSerVice, "isMatch").mockReturnValue(true);
            jest.spyOn(jwtSerVice, "sign").mockReturnValue("abc");
            await expect(
                service.signIn({
                    email: "abc@gmail.com",
                    password: PersonRole.RESIDENT,
                }),
            ).rejects.toThrow(err);
        });
    });
});

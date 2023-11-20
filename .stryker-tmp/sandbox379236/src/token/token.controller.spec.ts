// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
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
describe(stryMutAct_9fa48("2057") ? "" : (stryCov_9fa48("2057"), "TokenService"), () => {
  if (stryMutAct_9fa48("2058")) {
    {}
  } else {
    stryCov_9fa48("2058");
    let controller: TokenController;
    const mockToken = stryMutAct_9fa48("2059") ? "" : (stryCov_9fa48("2059"), "Token is valid");
    let accountRepository: Repository<Account>;
    let service: AuthServiceImp;
    let hashSerVice: HashService;
    let jwtSerVice: JwtService;
    const mockSignIn = ({
      email: "resident@gmail.com",
      password: "password"
    } as SignInDto);
    const signInResult = stryMutAct_9fa48("2060") ? {} : (stryCov_9fa48("2060"), {
      access_token: stryMutAct_9fa48("2061") ? "" : (stryCov_9fa48("2061"), "abc"),
      role: PersonRole.RESIDENT
    });
    const mockResident = ({
      id: "resident",
      profile: {
        date_of_birth: new Date(2022),
        name: "vobinh",
        gender: Gender.MALE,
        phone_number: "0978754723",
        front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
        back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg"
      },
      account: {
        owner_id: "resident",
        email: "resident@gmail.com",
        password: "password",
        avatarURL: "resident/avatar.svg"
      },
      role: PersonRole.RESIDENT
    } as Resident);
    const mockAccount = ({
      owner_id: "resident",
      email: "resident@gmail.com",
      password: "password",
      resident: mockResident
    } as Account);
    const ACCOUNT_REPOSITORY_TOKEN = getRepositoryToken(Account);
    beforeAll(async () => {
      if (stryMutAct_9fa48("2062")) {
        {}
      } else {
        stryCov_9fa48("2062");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("2063") ? {} : (stryCov_9fa48("2063"), {
          imports: stryMutAct_9fa48("2064") ? [] : (stryCov_9fa48("2064"), [NestjsFormDataModule.config(stryMutAct_9fa48("2065") ? {} : (stryCov_9fa48("2065"), {
            isGlobal: stryMutAct_9fa48("2066") ? false : (stryCov_9fa48("2066"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("2067") ? {} : (stryCov_9fa48("2067"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("2068")) {
                {}
              } else {
                stryCov_9fa48("2068");
                if (stryMutAct_9fa48("2071") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("2070") ? false : stryMutAct_9fa48("2069") ? true : (stryCov_9fa48("2069", "2070", "2071"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("2072") ? "" : (stryCov_9fa48("2072"), "true")))) {
                  if (stryMutAct_9fa48("2073")) {
                    {}
                  } else {
                    stryCov_9fa48("2073");
                    return stryMutAct_9fa48("2074") ? {} : (stryCov_9fa48("2074"), {
                      type: stryMutAct_9fa48("2075") ? "" : (stryCov_9fa48("2075"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("2076") ? false : (stryCov_9fa48("2076"), true),
                      entities: stryMutAct_9fa48("2077") ? [] : (stryCov_9fa48("2077"), [stryMutAct_9fa48("2078") ? "" : (stryCov_9fa48("2078"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("2079") ? {} : (stryCov_9fa48("2079"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("2080") ? "" : (stryCov_9fa48("2080"), "redis"),
                        options: stryMutAct_9fa48("2081") ? {} : (stryCov_9fa48("2081"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("2082")) {
                    {}
                  } else {
                    stryCov_9fa48("2082");
                    return stryMutAct_9fa48("2083") ? {} : (stryCov_9fa48("2083"), {
                      type: stryMutAct_9fa48("2084") ? "" : (stryCov_9fa48("2084"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("2085") ? false : (stryCov_9fa48("2085"), true),
                      entities: stryMutAct_9fa48("2086") ? [] : (stryCov_9fa48("2086"), [stryMutAct_9fa48("2087") ? "" : (stryCov_9fa48("2087"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("2088") ? {} : (stryCov_9fa48("2088"), {
                        type: stryMutAct_9fa48("2089") ? "" : (stryCov_9fa48("2089"), "redis"),
                        options: stryMutAct_9fa48("2090") ? {} : (stryCov_9fa48("2090"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("2091") ? [] : (stryCov_9fa48("2091"), [Account])), Repository<Account>, AuthModule, JwtModule, HashModule]),
          controllers: stryMutAct_9fa48("2092") ? [] : (stryCov_9fa48("2092"), [TokenController, AccountService, AuthServiceImp, JWTAuthGuard, JwtService])
        })).compile();
        controller = module.get<TokenController>(TokenController);
        service = module.get(AuthServiceImp);
      }
    }, 30000);
    it(stryMutAct_9fa48("2093") ? "" : (stryCov_9fa48("2093"), "should be defined"), () => {
      if (stryMutAct_9fa48("2094")) {
        {}
      } else {
        stryCov_9fa48("2094");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("2095") ? "" : (stryCov_9fa48("2095"), "get Token"), () => {
      if (stryMutAct_9fa48("2096")) {
        {}
      } else {
        stryCov_9fa48("2096");
        it(stryMutAct_9fa48("2097") ? "" : (stryCov_9fa48("2097"), "should find Token by id"), async () => {
          if (stryMutAct_9fa48("2098")) {
            {}
          } else {
            stryCov_9fa48("2098");
            const result = controller.validateToken();
            expect(result).toEqual(stryMutAct_9fa48("2099") ? "" : (stryCov_9fa48("2099"), "Token is valid"));
          }
        });
      }
    });
    describe(stryMutAct_9fa48("2100") ? "" : (stryCov_9fa48("2100"), "getExiredToken "), () => {
      if (stryMutAct_9fa48("2101")) {
        {}
      } else {
        stryCov_9fa48("2101");
        it(stryMutAct_9fa48("2102") ? "" : (stryCov_9fa48("2102"), "should find Token by id"), async () => {
          if (stryMutAct_9fa48("2103")) {
            {}
          } else {
            stryCov_9fa48("2103");
            jest.spyOn(service, stryMutAct_9fa48("2104") ? "" : (stryCov_9fa48("2104"), "signIn")).mockImplementation(stryMutAct_9fa48("2105") ? () => undefined : (stryCov_9fa48("2105"), async () => signInResult));
            const result = await controller.getExiredToken(mockSignIn);
            expect(result).toEqual(signInResult);
          }
        });
      }
    });
  }
});
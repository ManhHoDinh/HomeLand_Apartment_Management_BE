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
describe(stryMutAct_9fa48("368") ? "" : (stryCov_9fa48("368"), "AccountService"), () => {
  if (stryMutAct_9fa48("369")) {
    {}
  } else {
    stryCov_9fa48("369");
    let service: AuthServiceImp;
    let accountRepository: Repository<Account>;
    let hashSerVice: HashService;
    let jwtSerVice: JwtService;
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
        password: "0978754723",
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
      if (stryMutAct_9fa48("370")) {
        {}
      } else {
        stryCov_9fa48("370");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("371") ? {} : (stryCov_9fa48("371"), {
          imports: stryMutAct_9fa48("372") ? [] : (stryCov_9fa48("372"), [ConfigModule.forRoot(stryMutAct_9fa48("373") ? {} : (stryCov_9fa48("373"), {
            isGlobal: stryMutAct_9fa48("374") ? false : (stryCov_9fa48("374"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("375") ? {} : (stryCov_9fa48("375"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("376")) {
                {}
              } else {
                stryCov_9fa48("376");
                if (stryMutAct_9fa48("379") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("378") ? false : stryMutAct_9fa48("377") ? true : (stryCov_9fa48("377", "378", "379"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("380") ? "" : (stryCov_9fa48("380"), "true")))) {
                  if (stryMutAct_9fa48("381")) {
                    {}
                  } else {
                    stryCov_9fa48("381");
                    return stryMutAct_9fa48("382") ? {} : (stryCov_9fa48("382"), {
                      type: stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("384") ? false : (stryCov_9fa48("384"), true),
                      entities: stryMutAct_9fa48("385") ? [] : (stryCov_9fa48("385"), [stryMutAct_9fa48("386") ? "" : (stryCov_9fa48("386"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("387") ? {} : (stryCov_9fa48("387"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("388") ? "" : (stryCov_9fa48("388"), "redis"),
                        options: stryMutAct_9fa48("389") ? {} : (stryCov_9fa48("389"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("390")) {
                    {}
                  } else {
                    stryCov_9fa48("390");
                    return stryMutAct_9fa48("391") ? {} : (stryCov_9fa48("391"), {
                      type: stryMutAct_9fa48("392") ? "" : (stryCov_9fa48("392"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("393") ? false : (stryCov_9fa48("393"), true),
                      entities: stryMutAct_9fa48("394") ? [] : (stryCov_9fa48("394"), [stryMutAct_9fa48("395") ? "" : (stryCov_9fa48("395"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("396") ? {} : (stryCov_9fa48("396"), {
                        type: stryMutAct_9fa48("397") ? "" : (stryCov_9fa48("397"), "redis"),
                        options: stryMutAct_9fa48("398") ? {} : (stryCov_9fa48("398"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("399") ? [] : (stryCov_9fa48("399"), [Account])), Repository<Account>, HashModule]),
          providers: stryMutAct_9fa48("400") ? [] : (stryCov_9fa48("400"), [AuthServiceImp, AccountService, JWTAuthGuard, JwtService])
        })).compile();
        accountRepository = module.get<Repository<Account>>(ACCOUNT_REPOSITORY_TOKEN);
        service = module.get<AuthServiceImp>(AuthServiceImp);
        hashSerVice = module.get(HashService);
        jwtSerVice = module.get(JwtService);
      }
    }, 50000);
    it(stryMutAct_9fa48("401") ? "" : (stryCov_9fa48("401"), "should service be defined"), () => {
      if (stryMutAct_9fa48("402")) {
        {}
      } else {
        stryCov_9fa48("402");
        expect(service).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("403") ? "" : (stryCov_9fa48("403"), "should repository be defined"), () => {
      if (stryMutAct_9fa48("404")) {
        {}
      } else {
        stryCov_9fa48("404");
        expect(accountRepository).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("405") ? "" : (stryCov_9fa48("405"), "auth"), () => {
      if (stryMutAct_9fa48("406")) {
        {}
      } else {
        stryCov_9fa48("406");
        it(stryMutAct_9fa48("407") ? "" : (stryCov_9fa48("407"), "should find account by email"), async () => {
          if (stryMutAct_9fa48("408")) {
            {}
          } else {
            stryCov_9fa48("408");
            jest.spyOn(accountRepository, stryMutAct_9fa48("409") ? "" : (stryCov_9fa48("409"), "findOne")).mockImplementation(stryMutAct_9fa48("410") ? () => undefined : (stryCov_9fa48("410"), async () => mockAccount));
            const result = await service.findOwnerByAccountEmail(stryMutAct_9fa48("411") ? "" : (stryCov_9fa48("411"), "abc@gmail.com"));
            expect(result).toEqual(mockResident);
          }
        });
        it(stryMutAct_9fa48("412") ? "" : (stryCov_9fa48("412"), "should not find account by email"), async () => {
          if (stryMutAct_9fa48("413")) {
            {}
          } else {
            stryCov_9fa48("413");
            jest.spyOn(accountRepository, stryMutAct_9fa48("414") ? "" : (stryCov_9fa48("414"), "findOne")).mockImplementation(stryMutAct_9fa48("415") ? () => undefined : (stryCov_9fa48("415"), async () => null));
            const result = await service.findOwnerByAccountEmail(stryMutAct_9fa48("416") ? "" : (stryCov_9fa48("416"), "email"));
            await expect(result).toEqual(null);
          }
        });
        it(stryMutAct_9fa48("417") ? "" : (stryCov_9fa48("417"), "should find account by id"), async () => {
          if (stryMutAct_9fa48("418")) {
            {}
          } else {
            stryCov_9fa48("418");
            jest.spyOn(accountRepository, stryMutAct_9fa48("419") ? "" : (stryCov_9fa48("419"), "findOne")).mockImplementation(stryMutAct_9fa48("420") ? () => undefined : (stryCov_9fa48("420"), async () => mockAccount));
            const result = await service.findOwnerById(stryMutAct_9fa48("421") ? "" : (stryCov_9fa48("421"), "resident"));
            expect(result).toEqual(mockResident);
          }
        });
        it(stryMutAct_9fa48("422") ? "" : (stryCov_9fa48("422"), "should not find account by email"), async () => {
          if (stryMutAct_9fa48("423")) {
            {}
          } else {
            stryCov_9fa48("423");
            jest.spyOn(accountRepository, stryMutAct_9fa48("424") ? "" : (stryCov_9fa48("424"), "findOne")).mockRejectedValue(null);
            await expect(service.findOwnerById(stryMutAct_9fa48("425") ? "Stryker was here!" : (stryCov_9fa48("425"), ""))).rejects.toBe(null);
          }
        });
        it(stryMutAct_9fa48("426") ? "" : (stryCov_9fa48("426"), "should sign in"), async () => {
          if (stryMutAct_9fa48("427")) {
            {}
          } else {
            stryCov_9fa48("427");
            jest.spyOn(accountRepository, stryMutAct_9fa48("428") ? "" : (stryCov_9fa48("428"), "findOne")).mockImplementation(stryMutAct_9fa48("429") ? () => undefined : (stryCov_9fa48("429"), async () => mockAccount));
            jest.spyOn(hashSerVice, stryMutAct_9fa48("430") ? "" : (stryCov_9fa48("430"), "isMatch")).mockReturnValue(stryMutAct_9fa48("431") ? false : (stryCov_9fa48("431"), true));
            jest.spyOn(jwtSerVice, stryMutAct_9fa48("432") ? "" : (stryCov_9fa48("432"), "sign")).mockReturnValue(stryMutAct_9fa48("433") ? "" : (stryCov_9fa48("433"), "abc"));
            const result = await service.signIn(stryMutAct_9fa48("434") ? {} : (stryCov_9fa48("434"), {
              email: stryMutAct_9fa48("435") ? "" : (stryCov_9fa48("435"), "abc@gmail.com"),
              password: PersonRole.RESIDENT
            }));
            expect(result).toEqual(stryMutAct_9fa48("436") ? {} : (stryCov_9fa48("436"), {
              access_token: stryMutAct_9fa48("437") ? "" : (stryCov_9fa48("437"), "abc"),
              role: PersonRole.RESIDENT
            }));
          }
        });
        it(stryMutAct_9fa48("438") ? "" : (stryCov_9fa48("438"), "should sign in fail with not found person"), async () => {
          if (stryMutAct_9fa48("439")) {
            {}
          } else {
            stryCov_9fa48("439");
            const err = new UnauthorizedException(stryMutAct_9fa48("440") ? "" : (stryCov_9fa48("440"), "Wrong email or password"));
            jest.spyOn(accountRepository, stryMutAct_9fa48("441") ? "" : (stryCov_9fa48("441"), "findOne")).mockRejectedValue(err);
            jest.spyOn(hashSerVice, stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), "isMatch")).mockReturnValue(stryMutAct_9fa48("443") ? false : (stryCov_9fa48("443"), true));
            jest.spyOn(jwtSerVice, stryMutAct_9fa48("444") ? "" : (stryCov_9fa48("444"), "sign")).mockReturnValue(stryMutAct_9fa48("445") ? "" : (stryCov_9fa48("445"), "abc"));
            await expect(service.signIn(stryMutAct_9fa48("446") ? {} : (stryCov_9fa48("446"), {
              email: stryMutAct_9fa48("447") ? "" : (stryCov_9fa48("447"), "abc@gmail.com"),
              password: PersonRole.RESIDENT
            }))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), "should sign in fail with not found hash service false"), async () => {
          if (stryMutAct_9fa48("449")) {
            {}
          } else {
            stryCov_9fa48("449");
            const err = new UnauthorizedException(stryMutAct_9fa48("450") ? "" : (stryCov_9fa48("450"), "Wrong email or password"));
            jest.spyOn(accountRepository, stryMutAct_9fa48("451") ? "" : (stryCov_9fa48("451"), "findOne")).mockImplementation(stryMutAct_9fa48("452") ? () => undefined : (stryCov_9fa48("452"), async () => mockAccount));
            jest.spyOn(hashSerVice, stryMutAct_9fa48("453") ? "" : (stryCov_9fa48("453"), "isMatch")).mockReturnValue(stryMutAct_9fa48("454") ? true : (stryCov_9fa48("454"), false));
            jest.spyOn(jwtSerVice, stryMutAct_9fa48("455") ? "" : (stryCov_9fa48("455"), "sign")).mockReturnValue(stryMutAct_9fa48("456") ? "" : (stryCov_9fa48("456"), "abc"));
            await expect(service.signIn(stryMutAct_9fa48("457") ? {} : (stryCov_9fa48("457"), {
              email: stryMutAct_9fa48("458") ? "" : (stryCov_9fa48("458"), "abc@gmail.com"),
              password: PersonRole.RESIDENT
            }))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("459") ? "" : (stryCov_9fa48("459"), "should sign in fail with person not has account"), async () => {
          if (stryMutAct_9fa48("460")) {
            {}
          } else {
            stryCov_9fa48("460");
            const err = new UnauthorizedException(stryMutAct_9fa48("461") ? "" : (stryCov_9fa48("461"), "Wrong email or password"));
            jest.spyOn(accountRepository, stryMutAct_9fa48("462") ? "" : (stryCov_9fa48("462"), "findOne")).mockImplementation(stryMutAct_9fa48("463") ? () => undefined : (stryCov_9fa48("463"), async () => null));
            jest.spyOn(hashSerVice, stryMutAct_9fa48("464") ? "" : (stryCov_9fa48("464"), "isMatch")).mockReturnValue(stryMutAct_9fa48("465") ? false : (stryCov_9fa48("465"), true));
            jest.spyOn(jwtSerVice, stryMutAct_9fa48("466") ? "" : (stryCov_9fa48("466"), "sign")).mockReturnValue(stryMutAct_9fa48("467") ? "" : (stryCov_9fa48("467"), "abc"));
            await expect(service.signIn(stryMutAct_9fa48("468") ? {} : (stryCov_9fa48("468"), {
              email: stryMutAct_9fa48("469") ? "" : (stryCov_9fa48("469"), "abc@gmail.com"),
              password: PersonRole.RESIDENT
            }))).rejects.toThrow(err);
          }
        });
      }
    });
  }
});
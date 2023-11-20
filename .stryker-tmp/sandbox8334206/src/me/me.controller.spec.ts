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
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { MeController } from "./me.controller";
import { Resident } from "../resident/entities/resident.entity";
import { Admin } from "../admin/entities/admin.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
describe(stryMutAct_9fa48("1404") ? "" : (stryCov_9fa48("1404"), "MeService"), () => {
  if (stryMutAct_9fa48("1405")) {
    {}
  } else {
    stryCov_9fa48("1405");
    let controller: MeController;
    const mockMe = ({
      id: "",
      contracts: {},
      profile: {},
      created_at: new Date(),
      account: {},
      account_id: "123"
    } as Resident | Admin | Manager | Technician);
    beforeAll(async () => {
      if (stryMutAct_9fa48("1406")) {
        {}
      } else {
        stryCov_9fa48("1406");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1407") ? {} : (stryCov_9fa48("1407"), {
          imports: stryMutAct_9fa48("1408") ? [] : (stryCov_9fa48("1408"), [NestjsFormDataModule.config(stryMutAct_9fa48("1409") ? {} : (stryCov_9fa48("1409"), {
            isGlobal: stryMutAct_9fa48("1410") ? false : (stryCov_9fa48("1410"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1411") ? {} : (stryCov_9fa48("1411"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1412")) {
                {}
              } else {
                stryCov_9fa48("1412");
                if (stryMutAct_9fa48("1415") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1414") ? false : stryMutAct_9fa48("1413") ? true : (stryCov_9fa48("1413", "1414", "1415"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1416") ? "" : (stryCov_9fa48("1416"), "true")))) {
                  if (stryMutAct_9fa48("1417")) {
                    {}
                  } else {
                    stryCov_9fa48("1417");
                    return stryMutAct_9fa48("1418") ? {} : (stryCov_9fa48("1418"), {
                      type: stryMutAct_9fa48("1419") ? "" : (stryCov_9fa48("1419"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1420") ? false : (stryCov_9fa48("1420"), true),
                      entities: stryMutAct_9fa48("1421") ? [] : (stryCov_9fa48("1421"), [stryMutAct_9fa48("1422") ? "" : (stryCov_9fa48("1422"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1423") ? {} : (stryCov_9fa48("1423"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1424") ? "" : (stryCov_9fa48("1424"), "redis"),
                        options: stryMutAct_9fa48("1425") ? {} : (stryCov_9fa48("1425"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1426")) {
                    {}
                  } else {
                    stryCov_9fa48("1426");
                    return stryMutAct_9fa48("1427") ? {} : (stryCov_9fa48("1427"), {
                      type: stryMutAct_9fa48("1428") ? "" : (stryCov_9fa48("1428"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1429") ? false : (stryCov_9fa48("1429"), true),
                      entities: stryMutAct_9fa48("1430") ? [] : (stryCov_9fa48("1430"), [stryMutAct_9fa48("1431") ? "" : (stryCov_9fa48("1431"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1432") ? {} : (stryCov_9fa48("1432"), {
                        type: stryMutAct_9fa48("1433") ? "" : (stryCov_9fa48("1433"), "redis"),
                        options: stryMutAct_9fa48("1434") ? {} : (stryCov_9fa48("1434"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), AuthModule, JwtModule]),
          controllers: stryMutAct_9fa48("1435") ? [] : (stryCov_9fa48("1435"), [MeController])
        })).compile();
        controller = module.get<MeController>(MeController);
      }
    }, 30000);
    it(stryMutAct_9fa48("1436") ? "" : (stryCov_9fa48("1436"), "should be defined"), () => {
      if (stryMutAct_9fa48("1437")) {
        {}
      } else {
        stryCov_9fa48("1437");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1438") ? "" : (stryCov_9fa48("1438"), "get Me"), () => {
      if (stryMutAct_9fa48("1439")) {
        {}
      } else {
        stryCov_9fa48("1439");
        it(stryMutAct_9fa48("1440") ? "" : (stryCov_9fa48("1440"), "should find Me by id"), async () => {
          if (stryMutAct_9fa48("1441")) {
            {}
          } else {
            stryCov_9fa48("1441");
            const result = controller.getPersonalInfo(stryMutAct_9fa48("1442") ? {} : (stryCov_9fa48("1442"), {
              user: mockMe
            }));
            expect(result).toEqual(mockMe);
          }
        });
      }
    });
  }
});
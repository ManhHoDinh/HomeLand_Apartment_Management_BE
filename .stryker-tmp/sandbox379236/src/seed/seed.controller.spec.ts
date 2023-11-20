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
import { readFileSync } from "fs";
import { SeedService } from "./seed.service";
import { Seed } from "./seed.controller";
import { ApartmentModule } from "../apartment/apartment.module";
import { ResidentModule } from "../resident/resident.module";
import { HashModule } from "../hash/hash.module";
import { AvatarGeneratorModule } from "../avatar-generator/avatar-generator.module";
import { EmployeeModule } from "../employee/employee.module";
import { JWTAuthGuard } from "../auth/guard/jwt-auth.guard";
describe(stryMutAct_9fa48("1833") ? "" : (stryCov_9fa48("1833"), "SeedService"), () => {
  if (stryMutAct_9fa48("1834")) {
    {}
  } else {
    stryCov_9fa48("1834");
    let service: SeedService;
    let controller: Seed;
    const mockDeleteResult: UpdateResult = stryMutAct_9fa48("1835") ? {} : (stryCov_9fa48("1835"), {
      raw: stryMutAct_9fa48("1836") ? ["Stryker was here"] : (stryCov_9fa48("1836"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("1837") ? ["Stryker was here"] : (stryCov_9fa48("1837"), [])
    });
    beforeAll(async () => {
      if (stryMutAct_9fa48("1838")) {
        {}
      } else {
        stryCov_9fa48("1838");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1839") ? {} : (stryCov_9fa48("1839"), {
          imports: stryMutAct_9fa48("1840") ? [] : (stryCov_9fa48("1840"), [NestjsFormDataModule.config(stryMutAct_9fa48("1841") ? {} : (stryCov_9fa48("1841"), {
            isGlobal: stryMutAct_9fa48("1842") ? false : (stryCov_9fa48("1842"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1843") ? {} : (stryCov_9fa48("1843"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1844")) {
                {}
              } else {
                stryCov_9fa48("1844");
                if (stryMutAct_9fa48("1847") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1846") ? false : stryMutAct_9fa48("1845") ? true : (stryCov_9fa48("1845", "1846", "1847"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1848") ? "" : (stryCov_9fa48("1848"), "true")))) {
                  if (stryMutAct_9fa48("1849")) {
                    {}
                  } else {
                    stryCov_9fa48("1849");
                    return stryMutAct_9fa48("1850") ? {} : (stryCov_9fa48("1850"), {
                      type: stryMutAct_9fa48("1851") ? "" : (stryCov_9fa48("1851"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1852") ? false : (stryCov_9fa48("1852"), true),
                      entities: stryMutAct_9fa48("1853") ? [] : (stryCov_9fa48("1853"), [stryMutAct_9fa48("1854") ? "" : (stryCov_9fa48("1854"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1855") ? {} : (stryCov_9fa48("1855"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1856") ? "" : (stryCov_9fa48("1856"), "redis"),
                        options: stryMutAct_9fa48("1857") ? {} : (stryCov_9fa48("1857"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1858")) {
                    {}
                  } else {
                    stryCov_9fa48("1858");
                    return stryMutAct_9fa48("1859") ? {} : (stryCov_9fa48("1859"), {
                      type: stryMutAct_9fa48("1860") ? "" : (stryCov_9fa48("1860"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1861") ? false : (stryCov_9fa48("1861"), true),
                      entities: stryMutAct_9fa48("1862") ? [] : (stryCov_9fa48("1862"), [stryMutAct_9fa48("1863") ? "" : (stryCov_9fa48("1863"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1864") ? {} : (stryCov_9fa48("1864"), {
                        type: stryMutAct_9fa48("1865") ? "" : (stryCov_9fa48("1865"), "redis"),
                        options: stryMutAct_9fa48("1866") ? {} : (stryCov_9fa48("1866"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), ApartmentModule, ResidentModule, StorageModule, IdGeneratorModule, HashModule, AvatarGeneratorModule, EmployeeModule, AuthModule, StorageModule, JwtModule]),
          controllers: stryMutAct_9fa48("1867") ? [] : (stryCov_9fa48("1867"), [Seed]),
          providers: stryMutAct_9fa48("1868") ? [] : (stryCov_9fa48("1868"), [SeedService, stryMutAct_9fa48("1869") ? {} : (stryCov_9fa48("1869"), {
            provide: SeedService,
            useValue: stryMutAct_9fa48("1870") ? {} : (stryCov_9fa48("1870"), {
              startSeeding: jest.fn().mockResolvedValue(stryMutAct_9fa48("1871") ? {} : (stryCov_9fa48("1871"), {
                msg: stryMutAct_9fa48("1872") ? "" : (stryCov_9fa48("1872"), "Seeding started")
              })),
              createDB: jest.fn().mockResolvedValue(stryMutAct_9fa48("1873") ? {} : (stryCov_9fa48("1873"), {
                msg: stryMutAct_9fa48("1874") ? "" : (stryCov_9fa48("1874"), "DB created")
              })),
              dropDB: jest.fn().mockResolvedValue(stryMutAct_9fa48("1875") ? {} : (stryCov_9fa48("1875"), {
                msg: stryMutAct_9fa48("1876") ? "" : (stryCov_9fa48("1876"), "DB dropped")
              }))
            })
          })])
        })).compile();
        controller = module.get<Seed>(Seed);
        service = module.get<SeedService>(SeedService);
      }
    }, 30000);
    it(stryMutAct_9fa48("1877") ? "" : (stryCov_9fa48("1877"), "should be defined"), () => {
      if (stryMutAct_9fa48("1878")) {
        {}
      } else {
        stryCov_9fa48("1878");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1879") ? "" : (stryCov_9fa48("1879"), "startSeeding"), () => {
      if (stryMutAct_9fa48("1880")) {
        {}
      } else {
        stryCov_9fa48("1880");
        it(stryMutAct_9fa48("1881") ? "" : (stryCov_9fa48("1881"), "should start seeding"), async () => {
          if (stryMutAct_9fa48("1882")) {
            {}
          } else {
            stryCov_9fa48("1882");
            const result = await controller.startSeeding();
            expect(result).toEqual(stryMutAct_9fa48("1883") ? {} : (stryCov_9fa48("1883"), {
              msg: stryMutAct_9fa48("1884") ? "" : (stryCov_9fa48("1884"), "Seeding started")
            }));
            expect(service.startSeeding).toHaveBeenCalled();
          }
        });
      }
    });
    describe(stryMutAct_9fa48("1885") ? "" : (stryCov_9fa48("1885"), "Drop DB"), () => {
      if (stryMutAct_9fa48("1886")) {
        {}
      } else {
        stryCov_9fa48("1886");
        it(stryMutAct_9fa48("1887") ? "" : (stryCov_9fa48("1887"), "should drop DB"), async () => {
          if (stryMutAct_9fa48("1888")) {
            {}
          } else {
            stryCov_9fa48("1888");
            const result = await controller.dropDB();
            expect(result).toEqual(stryMutAct_9fa48("1889") ? {} : (stryCov_9fa48("1889"), {
              msg: stryMutAct_9fa48("1890") ? "" : (stryCov_9fa48("1890"), "DB dropped")
            }));
            expect(service.dropDB).toHaveBeenCalled();
          }
        });
      }
    });
    describe(stryMutAct_9fa48("1891") ? "" : (stryCov_9fa48("1891"), "Create DB"), () => {
      if (stryMutAct_9fa48("1892")) {
        {}
      } else {
        stryCov_9fa48("1892");
        it(stryMutAct_9fa48("1893") ? "" : (stryCov_9fa48("1893"), "should create DB"), async () => {
          if (stryMutAct_9fa48("1894")) {
            {}
          } else {
            stryCov_9fa48("1894");
            const result = await controller.createDB();
            expect(result).toEqual(stryMutAct_9fa48("1895") ? {} : (stryCov_9fa48("1895"), {
              msg: stryMutAct_9fa48("1896") ? "" : (stryCov_9fa48("1896"), "DB created")
            }));
            expect(service.createDB).toHaveBeenCalled();
          }
        });
      }
    });
  }
});
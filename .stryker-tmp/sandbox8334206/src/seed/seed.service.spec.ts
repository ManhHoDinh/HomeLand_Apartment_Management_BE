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
import { SeedService } from "./seed.service";
import { DataSource, EntityTarget } from "typeorm";
import { StorageManager, SupabaseStorageManager } from "../storage/storage.service";
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
import { SupabaseClient } from "@supabase/supabase-js";
import { PickType } from "@nestjs/swagger";
import { Apartment } from "src/apartment/entities/apartment.entity";
import { Repository } from "typeorm/browser";
import { Resident } from "src/resident/entities/resident.entity";
describe(stryMutAct_9fa48("1897") ? "" : (stryCov_9fa48("1897"), "SeedService"), () => {
  if (stryMutAct_9fa48("1898")) {
    {}
  } else {
    stryCov_9fa48("1898");
    let seedService: SeedService;
    let dataSource: DataSource;
    let storageManager: StorageManager;
    let idGenerator: IdGenerator;
    let hashService: HashService;
    let avatarGenerator: AvatarGenerator;
    let apartmentService: ApartmentService;
    let residentService: ResidentService;
    let supaClient: SupabaseClient;
    beforeEach(async () => {
      if (stryMutAct_9fa48("1899")) {
        {}
      } else {
        stryCov_9fa48("1899");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1900") ? {} : (stryCov_9fa48("1900"), {
          imports: stryMutAct_9fa48("1901") ? [] : (stryCov_9fa48("1901"), [NestjsFormDataModule.config(stryMutAct_9fa48("1902") ? {} : (stryCov_9fa48("1902"), {
            isGlobal: stryMutAct_9fa48("1903") ? false : (stryCov_9fa48("1903"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1904") ? {} : (stryCov_9fa48("1904"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1905")) {
                {}
              } else {
                stryCov_9fa48("1905");
                if (stryMutAct_9fa48("1908") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1907") ? false : stryMutAct_9fa48("1906") ? true : (stryCov_9fa48("1906", "1907", "1908"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1909") ? "" : (stryCov_9fa48("1909"), "true")))) {
                  if (stryMutAct_9fa48("1910")) {
                    {}
                  } else {
                    stryCov_9fa48("1910");
                    return stryMutAct_9fa48("1911") ? {} : (stryCov_9fa48("1911"), {
                      type: stryMutAct_9fa48("1912") ? "" : (stryCov_9fa48("1912"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1913") ? false : (stryCov_9fa48("1913"), true),
                      entities: stryMutAct_9fa48("1914") ? [] : (stryCov_9fa48("1914"), [stryMutAct_9fa48("1915") ? "" : (stryCov_9fa48("1915"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1916") ? {} : (stryCov_9fa48("1916"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1917") ? "" : (stryCov_9fa48("1917"), "redis"),
                        options: stryMutAct_9fa48("1918") ? {} : (stryCov_9fa48("1918"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1919")) {
                    {}
                  } else {
                    stryCov_9fa48("1919");
                    return stryMutAct_9fa48("1920") ? {} : (stryCov_9fa48("1920"), {
                      type: stryMutAct_9fa48("1921") ? "" : (stryCov_9fa48("1921"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1922") ? false : (stryCov_9fa48("1922"), true),
                      entities: stryMutAct_9fa48("1923") ? [] : (stryCov_9fa48("1923"), [stryMutAct_9fa48("1924") ? "" : (stryCov_9fa48("1924"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1925") ? {} : (stryCov_9fa48("1925"), {
                        type: stryMutAct_9fa48("1926") ? "" : (stryCov_9fa48("1926"), "redis"),
                        options: stryMutAct_9fa48("1927") ? {} : (stryCov_9fa48("1927"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), ApartmentModule, ResidentModule, StorageModule, IdGeneratorModule, HashModule, AvatarGeneratorModule, EmployeeModule, AuthModule, StorageModule, JwtModule]),
          providers: stryMutAct_9fa48("1928") ? [] : (stryCov_9fa48("1928"), [SeedService, stryMutAct_9fa48("1929") ? {} : (stryCov_9fa48("1929"), {
            provide: DataSource,
            useValue: stryMutAct_9fa48("1930") ? {} : (stryCov_9fa48("1930"), {
              dropDatabase: jest.fn().mockImplementation(async () => {}),
              synchronize: jest.fn().mockImplementation(async () => {})
            })
          }), Seed, stryMutAct_9fa48("1931") ? {} : (stryCov_9fa48("1931"), {
            provide: StorageManager,
            useValue: stryMutAct_9fa48("1932") ? {} : (stryCov_9fa48("1932"), {
              destroyStorage: jest.fn().mockImplementation(async () => {}),
              initiateStorage: jest.fn().mockImplementation(async () => {})
            })
          }), SupabaseStorageManager])
        })).compile();
        seedService = module.get<SeedService>(SeedService);
        dataSource = module.get<DataSource>(DataSource);
        storageManager = module.get<StorageManager>(StorageManager);
        idGenerator = module.get<IdGenerator>(IdGenerator);
        hashService = module.get<HashService>(HashService);
        avatarGenerator = module.get<AvatarGenerator>(AvatarGenerator);
        apartmentService = module.get<ApartmentService>(ApartmentService);
        residentService = module.get<ResidentService>(ResidentService);
        supaClient = module.get(SupabaseClient);
      }
    }, 30000);

    // afterEach(async () => {
    //     await dataSource.destroy();
    // });
    it(stryMutAct_9fa48("1933") ? "" : (stryCov_9fa48("1933"), "should be defined"), () => {
      if (stryMutAct_9fa48("1934")) {
        {}
      } else {
        stryCov_9fa48("1934");
        expect(seedService).toBeDefined();
        expect(dataSource).toBeDefined();
        expect(storageManager).toBeDefined();
        expect(supaClient).toBeDefined();
      }
    });
    // describe("startSeeding", () => {
    //     it("should start seeding", async () => {
    //         const result = await service.startSeeding();
    //         expect(result).toEqual({ msg: "Seeding started" });
    //     });
    // });

    describe(stryMutAct_9fa48("1935") ? "" : (stryCov_9fa48("1935"), "seed"), () => {
      if (stryMutAct_9fa48("1936")) {
        {}
      } else {
        stryCov_9fa48("1936");
        it(stryMutAct_9fa48("1937") ? "" : (stryCov_9fa48("1937"), "should drop database"), async () => {
          if (stryMutAct_9fa48("1938")) {
            {}
          } else {
            stryCov_9fa48("1938");
            jest.spyOn(supaClient.storage, stryMutAct_9fa48("1939") ? "" : (stryCov_9fa48("1939"), "emptyBucket")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1940")) {
                {}
              } else {
                stryCov_9fa48("1940");
                return stryMutAct_9fa48("1941") ? {} : (stryCov_9fa48("1941"), {
                  data: stryMutAct_9fa48("1942") ? {} : (stryCov_9fa48("1942"), {
                    message: stryMutAct_9fa48("1943") ? "" : (stryCov_9fa48("1943"), "success")
                  }),
                  error: null
                });
              }
            });
            jest.spyOn(supaClient.storage, stryMutAct_9fa48("1944") ? "" : (stryCov_9fa48("1944"), "deleteBucket")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1945")) {
                {}
              } else {
                stryCov_9fa48("1945");
                return stryMutAct_9fa48("1946") ? {} : (stryCov_9fa48("1946"), {
                  data: stryMutAct_9fa48("1947") ? {} : (stryCov_9fa48("1947"), {
                    message: stryMutAct_9fa48("1948") ? "" : (stryCov_9fa48("1948"), "success")
                  }),
                  error: null
                });
              }
            });
            await seedService.dropDB();
          }
        });
        it(stryMutAct_9fa48("1949") ? "" : (stryCov_9fa48("1949"), "should create database"), async () => {
          if (stryMutAct_9fa48("1950")) {
            {}
          } else {
            stryCov_9fa48("1950");
            jest.spyOn(supaClient.storage, stryMutAct_9fa48("1951") ? "" : (stryCov_9fa48("1951"), "createBucket")).mockImplementation(async (id, obj) => {
              if (stryMutAct_9fa48("1952")) {
                {}
              } else {
                stryCov_9fa48("1952");
                return stryMutAct_9fa48("1953") ? {} : (stryCov_9fa48("1953"), {
                  data: Buffer,
                  error: null
                });
              }
            });
            await seedService.createDB();
          }
        });
        it(stryMutAct_9fa48("1954") ? "" : (stryCov_9fa48("1954"), "should create demo apartment"), async () => {
          if (stryMutAct_9fa48("1955")) {
            {}
          } else {
            stryCov_9fa48("1955");
            jest.spyOn(apartmentService, stryMutAct_9fa48("1956") ? "" : (stryCov_9fa48("1956"), "create")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1957")) {
                {}
              } else {
                stryCov_9fa48("1957");
                return ({
                  apartment_id: "1",
                  name: "St. Crytal",
                  length: 1,
                  building_id: "1",
                  floor_id: "1",
                  width: 1,
                  description: "abc",
                  number_of_bathroom: 1,
                  number_of_bedroom: 1,
                  rent: 1,
                  status: "active",
                  imageURLs: ["img"],
                  created_at: new Date(2022)
                } as Apartment);
              }
            });
            await seedService.createDemoApartments(stryMutAct_9fa48("1958") ? [] : (stryCov_9fa48("1958"), [stryMutAct_9fa48("1959") ? "" : (stryCov_9fa48("1959"), "1")]));
          }
        });
      }
    });

    // describe("createDB", () => {
    //     it("should call initiateStorage and synchronize", async () => {
    //         const initiateStorageSpy = jest
    //             .spyOn(storageManager, "initiateStorage")
    //             .mockImplementation();
    //         const synchronizeSpy = jest
    //             .spyOn(dataSource, "synchronize")
    //             .mockImplementation();

    //         await seedService.createDB();

    //         expect(initiateStorageSpy).toHaveBeenCalled();
    //         expect(synchronizeSpy).toHaveBeenCalled();
    //     });

    //     it("should handle errors and rethrow them", async () => {
    //         const error = new Error("Test Error");
    //         jest.spyOn(storageManager, "initiateStorage").mockRejectedValue(
    //             error,
    //         );

    //         try {
    //             await seedService.createDB();
    //         } catch (e) {
    //             expect(e).toBe(error);
    //         }
    //     });
    // });
  }
});
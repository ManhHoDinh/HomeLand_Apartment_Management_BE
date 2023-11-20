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
import { MeController } from "./../me/me.controller";
import { BuildingService, TypeORMBuildingService } from "./building.service";
import { BuildingController } from "./building.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeORMTestingModule } from "../../test-utils/TypeORMTestingModule";
import { Building } from "./entities/building.entity";
import { Floor } from "../floor/entities/floor.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { BadRequestException, INestApplication, NotFoundException } from "@nestjs/common";
import { AppModule } from "../app.module";
import { faker, id_ID } from "@faker-js/faker";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { mock } from "node:test";
import { CreateAccountDto } from "src/account/dto/create-account.dto";
import { promiseHooks } from "v8";
import { error } from "console";
import { Apartment } from "../apartment/entities/apartment.entity";
describe(stryMutAct_9fa48("649") ? "" : (stryCov_9fa48("649"), "BuildingService"), () => {
  if (stryMutAct_9fa48("650")) {
    {}
  } else {
    stryCov_9fa48("650");
    let service: TypeORMBuildingService;
    let buildingRepository: Repository<Building>;
    const mockBuilding = ({
      building_id: "BLD4",
      max_floor: 0,
      name: "Building 3",
      address: "996 Daugherty Extension"
    } as Building);
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("651") ? {} : (stryCov_9fa48("651"), {
      raw: stryMutAct_9fa48("652") ? ["Stryker was here"] : (stryCov_9fa48("652"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("653") ? ["Stryker was here"] : (stryCov_9fa48("653"), [])
    });
    const BUILDING_REPOSITORY_TOKEN = getRepositoryToken(Building);
    beforeAll(async () => {
      if (stryMutAct_9fa48("654")) {
        {}
      } else {
        stryCov_9fa48("654");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("655") ? {} : (stryCov_9fa48("655"), {
          imports: stryMutAct_9fa48("656") ? [] : (stryCov_9fa48("656"), [NestjsFormDataModule.config(stryMutAct_9fa48("657") ? {} : (stryCov_9fa48("657"), {
            isGlobal: stryMutAct_9fa48("658") ? false : (stryCov_9fa48("658"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("659") ? {} : (stryCov_9fa48("659"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("660")) {
                {}
              } else {
                stryCov_9fa48("660");
                if (stryMutAct_9fa48("663") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("662") ? false : stryMutAct_9fa48("661") ? true : (stryCov_9fa48("661", "662", "663"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("664") ? "" : (stryCov_9fa48("664"), "true")))) {
                  if (stryMutAct_9fa48("665")) {
                    {}
                  } else {
                    stryCov_9fa48("665");
                    return stryMutAct_9fa48("666") ? {} : (stryCov_9fa48("666"), {
                      type: stryMutAct_9fa48("667") ? "" : (stryCov_9fa48("667"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("668") ? false : (stryCov_9fa48("668"), true),
                      entities: stryMutAct_9fa48("669") ? [] : (stryCov_9fa48("669"), [stryMutAct_9fa48("670") ? "" : (stryCov_9fa48("670"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("671") ? {} : (stryCov_9fa48("671"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("672") ? "" : (stryCov_9fa48("672"), "redis"),
                        options: stryMutAct_9fa48("673") ? {} : (stryCov_9fa48("673"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("674")) {
                    {}
                  } else {
                    stryCov_9fa48("674");
                    return stryMutAct_9fa48("675") ? {} : (stryCov_9fa48("675"), {
                      type: stryMutAct_9fa48("676") ? "" : (stryCov_9fa48("676"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("677") ? false : (stryCov_9fa48("677"), true),
                      entities: stryMutAct_9fa48("678") ? [] : (stryCov_9fa48("678"), [stryMutAct_9fa48("679") ? "" : (stryCov_9fa48("679"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("680") ? {} : (stryCov_9fa48("680"), {
                        type: stryMutAct_9fa48("681") ? "" : (stryCov_9fa48("681"), "redis"),
                        options: stryMutAct_9fa48("682") ? {} : (stryCov_9fa48("682"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("683") ? [] : (stryCov_9fa48("683"), [Building, Floor, Apartment])), IdGeneratorModule, Repository<Building>]),
          providers: stryMutAct_9fa48("684") ? [] : (stryCov_9fa48("684"), [TypeORMBuildingService])
        })).compile();
        buildingRepository = module.get<Repository<Building>>(BUILDING_REPOSITORY_TOKEN);
        service = module.get<TypeORMBuildingService>(TypeORMBuildingService);
      }
    }, 50000);
    it(stryMutAct_9fa48("685") ? "" : (stryCov_9fa48("685"), "should service be defined"), () => {
      if (stryMutAct_9fa48("686")) {
        {}
      } else {
        stryCov_9fa48("686");
        expect(service).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("687") ? "" : (stryCov_9fa48("687"), "should repository be defined"), () => {
      if (stryMutAct_9fa48("688")) {
        {}
      } else {
        stryCov_9fa48("688");
        expect(buildingRepository).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("689") ? "" : (stryCov_9fa48("689"), "building"), () => {
      if (stryMutAct_9fa48("690")) {
        {}
      } else {
        stryCov_9fa48("690");
        it(stryMutAct_9fa48("691") ? "" : (stryCov_9fa48("691"), "should find building by id"), async () => {
          if (stryMutAct_9fa48("692")) {
            {}
          } else {
            stryCov_9fa48("692");
            jest.spyOn(buildingRepository, stryMutAct_9fa48("693") ? "" : (stryCov_9fa48("693"), "findOne")).mockImplementation(stryMutAct_9fa48("694") ? () => undefined : (stryCov_9fa48("694"), async () => mockBuilding));
            const result = await service.findOne(mockBuilding.building_id);
            console.log(result);
            expect(result).toEqual(mockBuilding);
          }
        });
        it(stryMutAct_9fa48("695") ? "" : (stryCov_9fa48("695"), "should not find building by id"), async () => {
          if (stryMutAct_9fa48("696")) {
            {}
          } else {
            stryCov_9fa48("696");
            const err = new NotFoundException(stryMutAct_9fa48("697") ? "" : (stryCov_9fa48("697"), "Not found building"));
            jest.spyOn(buildingRepository, stryMutAct_9fa48("698") ? "" : (stryCov_9fa48("698"), "findOne")).mockRejectedValue(err);
            await expect(service.findOne(stryMutAct_9fa48("699") ? "Stryker was here!" : (stryCov_9fa48("699"), ""))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("700") ? "" : (stryCov_9fa48("700"), "should find all building"), async () => {
          if (stryMutAct_9fa48("701")) {
            {}
          } else {
            stryCov_9fa48("701");
            jest.spyOn(buildingRepository, stryMutAct_9fa48("702") ? "" : (stryCov_9fa48("702"), "find")).mockImplementation(stryMutAct_9fa48("703") ? () => undefined : (stryCov_9fa48("703"), async () => stryMutAct_9fa48("704") ? [] : (stryCov_9fa48("704"), [mockBuilding])));
            const result = await service.findAll();
            console.log(result);
            expect(result).toEqual(stryMutAct_9fa48("705") ? [] : (stryCov_9fa48("705"), [mockBuilding]));
          }
        });
      }
    });
    it(stryMutAct_9fa48("706") ? "" : (stryCov_9fa48("706"), "should create new building"), async () => {
      if (stryMutAct_9fa48("707")) {
        {}
      } else {
        stryCov_9fa48("707");
        jest.spyOn(buildingRepository, stryMutAct_9fa48("708") ? "" : (stryCov_9fa48("708"), "create")).mockImplementation(dto => {
          if (stryMutAct_9fa48("709")) {
            {}
          } else {
            stryCov_9fa48("709");
            return ({
              building_id: faker.string.binary(),
              name: dto.name,
              max_floor: dto.max_floor,
              address: dto.address
            } as Building);
          }
        });
        jest.spyOn(buildingRepository, stryMutAct_9fa48("710") ? "" : (stryCov_9fa48("710"), "save")).mockImplementation(async dto => {
          if (stryMutAct_9fa48("711")) {
            {}
          } else {
            stryCov_9fa48("711");
            return ({
              building_id: faker.string.binary(),
              name: dto.name,
              max_floor: dto.max_floor,
              address: dto.address
            } as Building);
          }
        });
        const result = await service.create(stryMutAct_9fa48("712") ? {} : (stryCov_9fa48("712"), {
          name: mockBuilding.name,
          max_floor: mockBuilding.max_floor,
          address: mockBuilding.address
        }));
        expect(result).toEqual(stryMutAct_9fa48("713") ? {} : (stryCov_9fa48("713"), {
          building_id: expect.any(String),
          name: mockBuilding.name,
          max_floor: mockBuilding.max_floor,
          address: mockBuilding.address
        }));
      }
    });
    it(stryMutAct_9fa48("714") ? "" : (stryCov_9fa48("714"), "should create new building fail"), async () => {
      if (stryMutAct_9fa48("715")) {
        {}
      } else {
        stryCov_9fa48("715");
        try {
          if (stryMutAct_9fa48("716")) {
            {}
          } else {
            stryCov_9fa48("716");
            const result = await service.create(stryMutAct_9fa48("717") ? {} : (stryCov_9fa48("717"), {
              name: mockBuilding.name,
              max_floor: mockBuilding.max_floor,
              address: mockBuilding.address
            }));
          }
        } catch (err) {
          if (stryMutAct_9fa48("718")) {
            {}
          } else {
            stryCov_9fa48("718");
            expect(err.message).toBe(stryMutAct_9fa48("719") ? "" : (stryCov_9fa48("719"), 'No metadata for "Building" was found.'));
          }
        }
      }
    });
    it(stryMutAct_9fa48("720") ? "" : (stryCov_9fa48("720"), "should update success building"), async () => {
      if (stryMutAct_9fa48("721")) {
        {}
      } else {
        stryCov_9fa48("721");
        jest.spyOn(buildingRepository, stryMutAct_9fa48("722") ? "" : (stryCov_9fa48("722"), "update")).mockImplementation(async () => {
          if (stryMutAct_9fa48("723")) {
            {}
          } else {
            stryCov_9fa48("723");
            return mockUpdateResult;
          }
        });
        const result = await service.update(stryMutAct_9fa48("724") ? "" : (stryCov_9fa48("724"), "BLD3"), mockBuilding);
        expect(result).toEqual(mockUpdateResult);
      }
    });
    it(stryMutAct_9fa48("725") ? "" : (stryCov_9fa48("725"), "should update building fail because id not found"), async () => {
      if (stryMutAct_9fa48("726")) {
        {}
      } else {
        stryCov_9fa48("726");
        try {
          if (stryMutAct_9fa48("727")) {
            {}
          } else {
            stryCov_9fa48("727");
            const result = await service.update(stryMutAct_9fa48("728") ? "Stryker was here!" : (stryCov_9fa48("728"), ""), mockBuilding);
          }
        } catch (e) {
          if (stryMutAct_9fa48("729")) {
            {}
          } else {
            stryCov_9fa48("729");
            expect(e.message).toBe(stryMutAct_9fa48("730") ? "" : (stryCov_9fa48("730"), "Id not found."));
          }
        }
      }
    });
    it(stryMutAct_9fa48("731") ? "" : (stryCov_9fa48("731"), "should search building"), async () => {
      if (stryMutAct_9fa48("732")) {
        {}
      } else {
        stryCov_9fa48("732");
        jest.spyOn(buildingRepository, stryMutAct_9fa48("733") ? "" : (stryCov_9fa48("733"), "find")).mockImplementation(stryMutAct_9fa48("734") ? () => undefined : (stryCov_9fa48("734"), async () => stryMutAct_9fa48("735") ? [] : (stryCov_9fa48("735"), [mockBuilding])));
        const result = await service.search(stryMutAct_9fa48("736") ? "" : (stryCov_9fa48("736"), "binh"));
        expect(result).toEqual(stryMutAct_9fa48("737") ? [] : (stryCov_9fa48("737"), [mockBuilding]));
      }
    });
    it(stryMutAct_9fa48("738") ? "" : (stryCov_9fa48("738"), "should delete success building"), async () => {
      if (stryMutAct_9fa48("739")) {
        {}
      } else {
        stryCov_9fa48("739");
        jest.spyOn(buildingRepository, stryMutAct_9fa48("740") ? "" : (stryCov_9fa48("740"), "softDelete")).mockImplementation(async () => {
          if (stryMutAct_9fa48("741")) {
            {}
          } else {
            stryCov_9fa48("741");
            return mockUpdateResult;
          }
        });
        const result = await service.delete(stryMutAct_9fa48("742") ? "" : (stryCov_9fa48("742"), "BLD3"));
        expect(result).toEqual(mockUpdateResult);
      }
    });
    it(stryMutAct_9fa48("743") ? "" : (stryCov_9fa48("743"), "should delete new building fail "), async () => {
      if (stryMutAct_9fa48("744")) {
        {}
      } else {
        stryCov_9fa48("744");
        const err = new Error(stryMutAct_9fa48("745") ? "" : (stryCov_9fa48("745"), "can not delete"));
        jest.spyOn(buildingRepository, stryMutAct_9fa48("746") ? "" : (stryCov_9fa48("746"), "softDelete")).mockRejectedValue(err);
        await expect(service.delete).rejects.toThrow(err);
      }
    });
  }
});
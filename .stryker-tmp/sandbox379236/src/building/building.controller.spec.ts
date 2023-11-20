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
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Apartment } from "../apartment/entities/apartment.entity";
describe(stryMutAct_9fa48("553") ? "" : (stryCov_9fa48("553"), "BuildingController"), () => {
  if (stryMutAct_9fa48("554")) {
    {}
  } else {
    stryCov_9fa48("554");
    let controller: BuildingController;
    let service: TypeORMBuildingService;
    const mockDeleteResult: DeleteResult = stryMutAct_9fa48("555") ? {} : (stryCov_9fa48("555"), {
      raw: stryMutAct_9fa48("556") ? ["Stryker was here"] : (stryCov_9fa48("556"), []),
      affected: 1
    });
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("557") ? {} : (stryCov_9fa48("557"), {
      raw: stryMutAct_9fa48("558") ? ["Stryker was here"] : (stryCov_9fa48("558"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("559") ? ["Stryker was here"] : (stryCov_9fa48("559"), [])
    });
    const mockBuilding = ({
      building_id: "BLD3",
      max_floor: 0,
      name: "Building 3",
      address: "996 Daugherty Extension"
    } as Building);
    const mockBuildingService = stryMutAct_9fa48("560") ? {} : (stryCov_9fa48("560"), {
      findAll: jest.fn().mockImplementation(stryMutAct_9fa48("561") ? () => undefined : (stryCov_9fa48("561"), () => stryMutAct_9fa48("562") ? [] : (stryCov_9fa48("562"), [mockBuilding]))),
      create: jest.fn().mockImplementation(dto => {
        if (stryMutAct_9fa48("563")) {
          {}
        } else {
          stryCov_9fa48("563");
          return stryMutAct_9fa48("564") ? {} : (stryCov_9fa48("564"), {
            building_id: stryMutAct_9fa48("565") ? "" : (stryCov_9fa48("565"), "fdvs"),
            max_floor: dto.max_floor,
            name: dto.name,
            address: dto.address
          });
        }
      }),
      findOne: jest.fn().mockImplementation(stryMutAct_9fa48("566") ? () => undefined : (stryCov_9fa48("566"), id => mockBuilding)),
      update: jest.fn().mockImplementation((id, dto) => {
        if (stryMutAct_9fa48("567")) {
          {}
        } else {
          stryCov_9fa48("567");
          return mockUpdateResult;
        }
      }),
      search: jest.fn().mockImplementation(stryMutAct_9fa48("568") ? () => undefined : (stryCov_9fa48("568"), query => stryMutAct_9fa48("569") ? [] : (stryCov_9fa48("569"), [mockBuilding]))),
      delete: jest.fn().mockImplementation(id => {
        if (stryMutAct_9fa48("570")) {
          {}
        } else {
          stryCov_9fa48("570");
          return mockUpdateResult;
        }
      })
    });
    beforeAll(async () => {
      if (stryMutAct_9fa48("571")) {
        {}
      } else {
        stryCov_9fa48("571");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("572") ? {} : (stryCov_9fa48("572"), {
          imports: stryMutAct_9fa48("573") ? [] : (stryCov_9fa48("573"), [NestjsFormDataModule.config(stryMutAct_9fa48("574") ? {} : (stryCov_9fa48("574"), {
            isGlobal: stryMutAct_9fa48("575") ? false : (stryCov_9fa48("575"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("576") ? {} : (stryCov_9fa48("576"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("577")) {
                {}
              } else {
                stryCov_9fa48("577");
                if (stryMutAct_9fa48("580") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("579") ? false : stryMutAct_9fa48("578") ? true : (stryCov_9fa48("578", "579", "580"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("581") ? "" : (stryCov_9fa48("581"), "true")))) {
                  if (stryMutAct_9fa48("582")) {
                    {}
                  } else {
                    stryCov_9fa48("582");
                    return stryMutAct_9fa48("583") ? {} : (stryCov_9fa48("583"), {
                      type: stryMutAct_9fa48("584") ? "" : (stryCov_9fa48("584"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("585") ? false : (stryCov_9fa48("585"), true),
                      entities: stryMutAct_9fa48("586") ? [] : (stryCov_9fa48("586"), [stryMutAct_9fa48("587") ? "" : (stryCov_9fa48("587"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("588") ? {} : (stryCov_9fa48("588"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("589") ? "" : (stryCov_9fa48("589"), "redis"),
                        options: stryMutAct_9fa48("590") ? {} : (stryCov_9fa48("590"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("591")) {
                    {}
                  } else {
                    stryCov_9fa48("591");
                    return stryMutAct_9fa48("592") ? {} : (stryCov_9fa48("592"), {
                      type: stryMutAct_9fa48("593") ? "" : (stryCov_9fa48("593"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("594") ? false : (stryCov_9fa48("594"), true),
                      entities: stryMutAct_9fa48("595") ? [] : (stryCov_9fa48("595"), [stryMutAct_9fa48("596") ? "" : (stryCov_9fa48("596"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("597") ? {} : (stryCov_9fa48("597"), {
                        type: stryMutAct_9fa48("598") ? "" : (stryCov_9fa48("598"), "redis"),
                        options: stryMutAct_9fa48("599") ? {} : (stryCov_9fa48("599"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("600") ? [] : (stryCov_9fa48("600"), [Building, Floor, Apartment])), IdGeneratorModule, Repository<Building>]),
          controllers: stryMutAct_9fa48("601") ? [] : (stryCov_9fa48("601"), [BuildingController]),
          providers: stryMutAct_9fa48("602") ? [] : (stryCov_9fa48("602"), [TypeORMBuildingService])
        })).overrideProvider(TypeORMBuildingService).useValue(mockBuildingService).compile();
        controller = module.get<BuildingController>(BuildingController);
      }
    }, 30000);
    it(stryMutAct_9fa48("603") ? "" : (stryCov_9fa48("603"), "should be defined"), () => {
      if (stryMutAct_9fa48("604")) {
        {}
      } else {
        stryCov_9fa48("604");
        expect(module).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("605") ? "" : (stryCov_9fa48("605"), "should be defined"), () => {
      if (stryMutAct_9fa48("606")) {
        {}
      } else {
        stryCov_9fa48("606");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("607") ? "" : (stryCov_9fa48("607"), "building"), () => {
      if (stryMutAct_9fa48("608")) {
        {}
      } else {
        stryCov_9fa48("608");
        it(stryMutAct_9fa48("609") ? "" : (stryCov_9fa48("609"), "should find building by id"), async () => {
          if (stryMutAct_9fa48("610")) {
            {}
          } else {
            stryCov_9fa48("610");
            const result = await controller.findOne(mockBuilding.building_id);
            expect(mockBuildingService.findOne).toHaveBeenCalledWith(mockBuilding.building_id);
            expect(result).toEqual(mockBuilding);
          }
        });
        it(stryMutAct_9fa48("611") ? "" : (stryCov_9fa48("611"), "should not find building by id"), async () => {
          if (stryMutAct_9fa48("612")) {
            {}
          } else {
            stryCov_9fa48("612");
            const err = new Error(stryMutAct_9fa48("613") ? "" : (stryCov_9fa48("613"), "Building not found"));
            jest.spyOn(mockBuildingService, stryMutAct_9fa48("614") ? "" : (stryCov_9fa48("614"), "findOne")).mockRejectedValue(err);
            await expect(controller.findOne(stryMutAct_9fa48("615") ? "Stryker was here!" : (stryCov_9fa48("615"), ""))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("616") ? "" : (stryCov_9fa48("616"), "should find all building"), async () => {
          if (stryMutAct_9fa48("617")) {
            {}
          } else {
            stryCov_9fa48("617");
            const result = await controller.findAll();
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual(stryMutAct_9fa48("618") ? [] : (stryCov_9fa48("618"), [mockBuilding]));
            expect(mockBuildingService.findAll).toHaveBeenCalled();
          }
        });
        it(stryMutAct_9fa48("619") ? "" : (stryCov_9fa48("619"), "should create new building"), async () => {
          if (stryMutAct_9fa48("620")) {
            {}
          } else {
            stryCov_9fa48("620");
            const result = await controller.create(stryMutAct_9fa48("621") ? {} : (stryCov_9fa48("621"), {
              max_floor: 0,
              name: stryMutAct_9fa48("622") ? "" : (stryCov_9fa48("622"), "Building 3"),
              address: stryMutAct_9fa48("623") ? "" : (stryCov_9fa48("623"), "996 Daugherty Extension")
            }));
            expect(result).toEqual(stryMutAct_9fa48("624") ? {} : (stryCov_9fa48("624"), {
              building_id: expect.any(String),
              max_floor: 0,
              name: stryMutAct_9fa48("625") ? "" : (stryCov_9fa48("625"), "Building 3"),
              address: stryMutAct_9fa48("626") ? "" : (stryCov_9fa48("626"), "996 Daugherty Extension")
            }));
          }
        });
        it(stryMutAct_9fa48("627") ? "" : (stryCov_9fa48("627"), "should update success building"), async () => {
          if (stryMutAct_9fa48("628")) {
            {}
          } else {
            stryCov_9fa48("628");
            const result = await controller.update(stryMutAct_9fa48("629") ? "" : (stryCov_9fa48("629"), "BLD3"), stryMutAct_9fa48("630") ? {} : (stryCov_9fa48("630"), {
              max_floor: 0,
              name: stryMutAct_9fa48("631") ? "" : (stryCov_9fa48("631"), "Building 3"),
              address: stryMutAct_9fa48("632") ? "" : (stryCov_9fa48("632"), "996 Daugherty Extension")
            }));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("633") ? "" : (stryCov_9fa48("633"), "should update building fail because id not found"), async () => {
          if (stryMutAct_9fa48("634")) {
            {}
          } else {
            stryCov_9fa48("634");
            const mError = new Error(stryMutAct_9fa48("635") ? "" : (stryCov_9fa48("635"), "Building not found"));
            jest.spyOn(mockBuildingService, stryMutAct_9fa48("636") ? "" : (stryCov_9fa48("636"), "update")).mockRejectedValue(mError);
            await expect(controller.update).rejects.toThrow(mError);
          }
        });
        it(stryMutAct_9fa48("637") ? "" : (stryCov_9fa48("637"), "should search building"), async () => {
          if (stryMutAct_9fa48("638")) {
            {}
          } else {
            stryCov_9fa48("638");
            const result = await controller.searchBuilding(stryMutAct_9fa48("639") ? "" : (stryCov_9fa48("639"), "binh"));
            expect(result).toEqual(stryMutAct_9fa48("640") ? [] : (stryCov_9fa48("640"), [mockBuilding]));
          }
        });
        it(stryMutAct_9fa48("641") ? "" : (stryCov_9fa48("641"), "should delete success building"), async () => {
          if (stryMutAct_9fa48("642")) {
            {}
          } else {
            stryCov_9fa48("642");
            const result = await controller.softDeleteBuilding(stryMutAct_9fa48("643") ? "" : (stryCov_9fa48("643"), "BLD3"));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("644") ? "" : (stryCov_9fa48("644"), "should delete fail building"), async () => {
          if (stryMutAct_9fa48("645")) {
            {}
          } else {
            stryCov_9fa48("645");
            const mError = new Error(stryMutAct_9fa48("646") ? "" : (stryCov_9fa48("646"), "Building not found to delete"));
            jest.spyOn(mockBuildingService, stryMutAct_9fa48("647") ? "" : (stryCov_9fa48("647"), "delete")).mockRejectedValue(mError);
            await expect(controller.softDeleteBuilding(stryMutAct_9fa48("648") ? "Stryker was here!" : (stryCov_9fa48("648"), ""))).rejects.toThrow(mError);
          }
        });
      }
    });
  }
});
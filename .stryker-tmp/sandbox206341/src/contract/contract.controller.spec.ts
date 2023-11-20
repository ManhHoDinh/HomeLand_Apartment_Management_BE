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
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { Contract } from "./entities/contract.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { ContractRole, ContractStatusRole } from "../helper/enums/contractEnum";
import { CreateContractDto } from "./dto/create-contract.dto";
import { readFileSync } from "fs";
import { UpdateContractDto } from "./dto/update-contract.dto";
describe(stryMutAct_9fa48("772") ? "" : (stryCov_9fa48("772"), "ContractService"), () => {
  if (stryMutAct_9fa48("773")) {
    {}
  } else {
    stryCov_9fa48("773");
    let service: ContractService;
    let controller: ContractController;
    const mockDeleteResult: UpdateResult = stryMutAct_9fa48("774") ? {} : (stryCov_9fa48("774"), {
      raw: stryMutAct_9fa48("775") ? ["Stryker was here"] : (stryCov_9fa48("775"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("776") ? ["Stryker was here"] : (stryCov_9fa48("776"), [])
    });
    const mockContract = ({
      contract_id: "CT001",
      apartment_id: "123",
      resident_id: "123",
      role: ContractRole.RENT,
      status: ContractStatusRole.INACTIVE,
      expire_at: new Date("2030-01-01")
    } as Contract);
    function findAllResult(page?: Number, total?: Number) {
      if (stryMutAct_9fa48("777")) {
        {}
      } else {
        stryCov_9fa48("777");
        return stryMutAct_9fa48("778") ? {} : (stryCov_9fa48("778"), {
          current_page: page,
          data: mockContract,
          per_page: 30,
          total: total
        });
      }
    }
    const mockUpdateResult = stryMutAct_9fa48("779") ? [] : (stryCov_9fa48("779"), [stryMutAct_9fa48("780") ? {} : (stryCov_9fa48("780"), {
      msg: stryMutAct_9fa48("781") ? "" : (stryCov_9fa48("781"), "Contract updated")
    }), stryMutAct_9fa48("782") ? {} : (stryCov_9fa48("782"), {
      apartment_id: mockContract.apartment_id,
      contract_id: mockContract.contract_id,
      expire_at: mockContract.expire_at,
      resident_id: mockContract.resident_id,
      role: mockContract.role,
      status: mockContract.status
    })]);
    const image = ({
      buffer: readFileSync(process.cwd() + "/src/seed/room.jpg")
    } as MemoryStoredFile);
    beforeAll(async () => {
      if (stryMutAct_9fa48("783")) {
        {}
      } else {
        stryCov_9fa48("783");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("784") ? {} : (stryCov_9fa48("784"), {
          imports: stryMutAct_9fa48("785") ? [] : (stryCov_9fa48("785"), [NestjsFormDataModule.config(stryMutAct_9fa48("786") ? {} : (stryCov_9fa48("786"), {
            isGlobal: stryMutAct_9fa48("787") ? false : (stryCov_9fa48("787"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("788") ? {} : (stryCov_9fa48("788"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("789")) {
                {}
              } else {
                stryCov_9fa48("789");
                if (stryMutAct_9fa48("792") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("791") ? false : stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790", "791", "792"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("793") ? "" : (stryCov_9fa48("793"), "true")))) {
                  if (stryMutAct_9fa48("794")) {
                    {}
                  } else {
                    stryCov_9fa48("794");
                    return stryMutAct_9fa48("795") ? {} : (stryCov_9fa48("795"), {
                      type: stryMutAct_9fa48("796") ? "" : (stryCov_9fa48("796"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("797") ? false : (stryCov_9fa48("797"), true),
                      entities: stryMutAct_9fa48("798") ? [] : (stryCov_9fa48("798"), [stryMutAct_9fa48("799") ? "" : (stryCov_9fa48("799"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("800") ? {} : (stryCov_9fa48("800"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("801") ? "" : (stryCov_9fa48("801"), "redis"),
                        options: stryMutAct_9fa48("802") ? {} : (stryCov_9fa48("802"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("803")) {
                    {}
                  } else {
                    stryCov_9fa48("803");
                    return stryMutAct_9fa48("804") ? {} : (stryCov_9fa48("804"), {
                      type: stryMutAct_9fa48("805") ? "" : (stryCov_9fa48("805"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("806") ? false : (stryCov_9fa48("806"), true),
                      entities: stryMutAct_9fa48("807") ? [] : (stryCov_9fa48("807"), [stryMutAct_9fa48("808") ? "" : (stryCov_9fa48("808"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("809") ? {} : (stryCov_9fa48("809"), {
                        type: stryMutAct_9fa48("810") ? "" : (stryCov_9fa48("810"), "redis"),
                        options: stryMutAct_9fa48("811") ? {} : (stryCov_9fa48("811"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("812") ? [] : (stryCov_9fa48("812"), [Contract])), AuthModule, StorageModule, IdGeneratorModule, JwtModule, Repository<Contract>]),
          controllers: stryMutAct_9fa48("813") ? [] : (stryCov_9fa48("813"), [ContractController]),
          providers: stryMutAct_9fa48("814") ? [] : (stryCov_9fa48("814"), [ContractService, stryMutAct_9fa48("815") ? {} : (stryCov_9fa48("815"), {
            provide: ContractService,
            useValue: stryMutAct_9fa48("816") ? {} : (stryCov_9fa48("816"), {
              create: jest.fn().mockImplementation(stryMutAct_9fa48("817") ? () => undefined : (stryCov_9fa48("817"), () => mockContract)),
              findOne: jest.fn().mockImplementation(stryMutAct_9fa48("818") ? () => undefined : (stryCov_9fa48("818"), async () => mockContract)),
              findAll: jest.fn().mockImplementation(stryMutAct_9fa48("819") ? () => undefined : (stryCov_9fa48("819"), async () => mockContract)),
              update: jest.fn().mockImplementation(async () => {
                if (stryMutAct_9fa48("820")) {
                  {}
                } else {
                  stryCov_9fa48("820");
                  return mockUpdateResult;
                }
              }),
              remove: jest.fn().mockImplementation(async () => {
                if (stryMutAct_9fa48("821")) {
                  {}
                } else {
                  stryCov_9fa48("821");
                  return mockDeleteResult;
                }
              })
            })
          }), JwtService])
        })).compile();
        controller = module.get<ContractController>(ContractController);
        service = module.get<ContractService>(ContractService);
      }
    }, 30000);
    it(stryMutAct_9fa48("822") ? "" : (stryCov_9fa48("822"), "should be defined"), () => {
      if (stryMutAct_9fa48("823")) {
        {}
      } else {
        stryCov_9fa48("823");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("824") ? "" : (stryCov_9fa48("824"), "get Contracts"), () => {
      if (stryMutAct_9fa48("825")) {
        {}
      } else {
        stryCov_9fa48("825");
        it(stryMutAct_9fa48("826") ? "" : (stryCov_9fa48("826"), "should find contract by id"), async () => {
          if (stryMutAct_9fa48("827")) {
            {}
          } else {
            stryCov_9fa48("827");
            const result = await controller.findOne(mockContract.contract_id);
            expect(result).toEqual(mockContract);
            expect(service.findOne).toHaveBeenCalledWith(mockContract.contract_id);
          }
        });
        it(stryMutAct_9fa48("828") ? "" : (stryCov_9fa48("828"), "should find all contract"), async () => {
          if (stryMutAct_9fa48("829")) {
            {}
          } else {
            stryCov_9fa48("829");
            const result = await controller.findAll();
            expect(result).toEqual(findAllResult());
          }
        });
        it(stryMutAct_9fa48("830") ? "" : (stryCov_9fa48("830"), "should find all contract with page"), async () => {
          if (stryMutAct_9fa48("831")) {
            {}
          } else {
            stryCov_9fa48("831");
            const result = await controller.findAll(1);
            expect(result).toEqual(findAllResult(1));
            expect(service.findAll).toHaveBeenCalledWith(1);
          }
        });
      }
    });
    describe(stryMutAct_9fa48("832") ? "" : (stryCov_9fa48("832"), "create contract"), () => {
      if (stryMutAct_9fa48("833")) {
        {}
      } else {
        stryCov_9fa48("833");
        it(stryMutAct_9fa48("834") ? "" : (stryCov_9fa48("834"), "should create new Contract success"), async () => {
          if (stryMutAct_9fa48("835")) {
            {}
          } else {
            stryCov_9fa48("835");
            const result = await controller.create(({
              apartment_id: mockContract.apartment_id,
              resident_id: mockContract.resident_id,
              expire_at: mockContract.expire_at,
              role: mockContract.role,
              status: mockContract.status
            } as CreateContractDto));
            expect(result).toEqual(stryMutAct_9fa48("836") ? {} : (stryCov_9fa48("836"), {
              contract_id: expect.any(String),
              apartment_id: mockContract.apartment_id,
              resident_id: mockContract.resident_id,
              expire_at: mockContract.expire_at,
              role: mockContract.role,
              status: mockContract.status
            }));
            expect(service.create).toHaveBeenCalled();
          }
        });
        it(stryMutAct_9fa48("837") ? "" : (stryCov_9fa48("837"), "should create new contract fail"), async () => {
          if (stryMutAct_9fa48("838")) {
            {}
          } else {
            stryCov_9fa48("838");
            try {
              if (stryMutAct_9fa48("839")) {
                {}
              } else {
                stryCov_9fa48("839");
                const result = await controller.create(({
                  apartment_id: mockContract.apartment_id,
                  resident_id: mockContract.resident_id,
                  expire_at: mockContract.expire_at,
                  role: mockContract.role,
                  status: mockContract.status
                } as CreateContractDto));
              }
            } catch (err) {
              if (stryMutAct_9fa48("840")) {
                {}
              } else {
                stryCov_9fa48("840");
                expect(err.message).toBe(stryMutAct_9fa48("841") ? "" : (stryCov_9fa48("841"), 'No metadata for "Contract" was found.'));
              }
            }
          }
        });
      }
    });
    describe(stryMutAct_9fa48("842") ? "" : (stryCov_9fa48("842"), "Update contract"), () => {
      if (stryMutAct_9fa48("843")) {
        {}
      } else {
        stryCov_9fa48("843");
        it(stryMutAct_9fa48("844") ? "" : (stryCov_9fa48("844"), "should update Contract success"), async () => {
          if (stryMutAct_9fa48("845")) {
            {}
          } else {
            stryCov_9fa48("845");
            const result = await controller.update(mockContract.contract_id, (mockContract as CreateContractDto));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("846") ? "" : (stryCov_9fa48("846"), "should update Contract success with image"), async () => {
          if (stryMutAct_9fa48("847")) {
            {}
          } else {
            stryCov_9fa48("847");
            const result = await controller.update(mockContract.contract_id, ({
              imageUpdate: image,
              ...mockContract
            } as UpdateContractDto));
            expect(result).toEqual(mockUpdateResult);
          }
        }, 30000);
        it(stryMutAct_9fa48("848") ? "" : (stryCov_9fa48("848"), "should update Contract success with invalid id"), async () => {
          if (stryMutAct_9fa48("849")) {
            {}
          } else {
            stryCov_9fa48("849");
            try {
              if (stryMutAct_9fa48("850")) {
                {}
              } else {
                stryCov_9fa48("850");
                const result = await controller.update(stryMutAct_9fa48("851") ? "" : (stryCov_9fa48("851"), "in-val"), ({
                  imageUpdate: image,
                  ...mockContract
                } as UpdateContractDto));
              }
            } catch (err) {
              if (stryMutAct_9fa48("852")) {
                {}
              } else {
                stryCov_9fa48("852");
                expect(err.message).toBe(stryMutAct_9fa48("853") ? "" : (stryCov_9fa48("853"), "Contract not found"));
              }
            }
          }
        });
      }
    });
    describe(stryMutAct_9fa48("854") ? "" : (stryCov_9fa48("854"), "Delete contract"), () => {
      if (stryMutAct_9fa48("855")) {
        {}
      } else {
        stryCov_9fa48("855");
        it(stryMutAct_9fa48("856") ? "" : (stryCov_9fa48("856"), "should delete Contract success"), async () => {
          if (stryMutAct_9fa48("857")) {
            {}
          } else {
            stryCov_9fa48("857");
            const result = await controller.remove(mockContract.contract_id);
            expect(result).toEqual(mockDeleteResult);
          }
        });
      }
    });
  }
});
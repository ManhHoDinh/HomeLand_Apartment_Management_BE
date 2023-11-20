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
import { NotFoundException } from "@nestjs/common";
describe(stryMutAct_9fa48("858") ? "" : (stryCov_9fa48("858"), "ContractService"), () => {
  if (stryMutAct_9fa48("859")) {
    {}
  } else {
    stryCov_9fa48("859");
    let service: ContractService;
    let repository: Repository<Contract>;
    const mockDeleteResult: UpdateResult = stryMutAct_9fa48("860") ? {} : (stryCov_9fa48("860"), {
      raw: stryMutAct_9fa48("861") ? ["Stryker was here"] : (stryCov_9fa48("861"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("862") ? ["Stryker was here"] : (stryCov_9fa48("862"), [])
    });
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("863") ? {} : (stryCov_9fa48("863"), {
      raw: stryMutAct_9fa48("864") ? ["Stryker was here"] : (stryCov_9fa48("864"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("865") ? ["Stryker was here"] : (stryCov_9fa48("865"), [])
    });
    const image = ({
      extension: "jpg",
      mimetype: "image/jpeg",
      buffer: readFileSync(process.cwd() + "/src/seed/room.jpg")
    } as MemoryStoredFile);
    const mockContract = ({
      contract_id: "CT001",
      apartment_id: "123",
      resident_id: "123",
      role: ContractRole.RENT,
      status: ContractStatusRole.INACTIVE,
      expire_at: new Date("2030-01-01")
    } as Contract);
    const CONTRACT_REPOSITORY_TOKEN = getRepositoryToken(Contract);
    beforeAll(async () => {
      if (stryMutAct_9fa48("866")) {
        {}
      } else {
        stryCov_9fa48("866");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("867") ? {} : (stryCov_9fa48("867"), {
          imports: stryMutAct_9fa48("868") ? [] : (stryCov_9fa48("868"), [NestjsFormDataModule.config(stryMutAct_9fa48("869") ? {} : (stryCov_9fa48("869"), {
            isGlobal: stryMutAct_9fa48("870") ? false : (stryCov_9fa48("870"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("871") ? {} : (stryCov_9fa48("871"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("872")) {
                {}
              } else {
                stryCov_9fa48("872");
                if (stryMutAct_9fa48("875") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("874") ? false : stryMutAct_9fa48("873") ? true : (stryCov_9fa48("873", "874", "875"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("876") ? "" : (stryCov_9fa48("876"), "true")))) {
                  if (stryMutAct_9fa48("877")) {
                    {}
                  } else {
                    stryCov_9fa48("877");
                    return stryMutAct_9fa48("878") ? {} : (stryCov_9fa48("878"), {
                      type: stryMutAct_9fa48("879") ? "" : (stryCov_9fa48("879"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("880") ? false : (stryCov_9fa48("880"), true),
                      entities: stryMutAct_9fa48("881") ? [] : (stryCov_9fa48("881"), [stryMutAct_9fa48("882") ? "" : (stryCov_9fa48("882"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("883") ? {} : (stryCov_9fa48("883"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("884") ? "" : (stryCov_9fa48("884"), "redis"),
                        options: stryMutAct_9fa48("885") ? {} : (stryCov_9fa48("885"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("886")) {
                    {}
                  } else {
                    stryCov_9fa48("886");
                    return stryMutAct_9fa48("887") ? {} : (stryCov_9fa48("887"), {
                      type: stryMutAct_9fa48("888") ? "" : (stryCov_9fa48("888"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("889") ? false : (stryCov_9fa48("889"), true),
                      entities: stryMutAct_9fa48("890") ? [] : (stryCov_9fa48("890"), [stryMutAct_9fa48("891") ? "" : (stryCov_9fa48("891"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("892") ? {} : (stryCov_9fa48("892"), {
                        type: stryMutAct_9fa48("893") ? "" : (stryCov_9fa48("893"), "redis"),
                        options: stryMutAct_9fa48("894") ? {} : (stryCov_9fa48("894"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("895") ? [] : (stryCov_9fa48("895"), [Contract])), AuthModule, StorageModule, IdGeneratorModule, JwtModule, Repository<Contract>]),
          providers: stryMutAct_9fa48("896") ? [] : (stryCov_9fa48("896"), [ContractService, JwtService])
        })).compile();
        repository = module.get<Repository<Contract>>(CONTRACT_REPOSITORY_TOKEN);
        service = module.get<ContractService>(ContractService);
      }
    }, 30000);
    it(stryMutAct_9fa48("897") ? "" : (stryCov_9fa48("897"), "should be defined"), () => {
      if (stryMutAct_9fa48("898")) {
        {}
      } else {
        stryCov_9fa48("898");
        expect(service).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("899") ? "" : (stryCov_9fa48("899"), "get Contracts"), () => {
      if (stryMutAct_9fa48("900")) {
        {}
      } else {
        stryCov_9fa48("900");
        it(stryMutAct_9fa48("901") ? "" : (stryCov_9fa48("901"), "should find contract by id"), async () => {
          if (stryMutAct_9fa48("902")) {
            {}
          } else {
            stryCov_9fa48("902");
            jest.spyOn(repository, stryMutAct_9fa48("903") ? "" : (stryCov_9fa48("903"), "findOne")).mockImplementation(stryMutAct_9fa48("904") ? () => undefined : (stryCov_9fa48("904"), async () => mockContract));
            const result = await service.findOne(mockContract.contract_id);
            expect(result).toEqual(mockContract);
          }
        });
        it(stryMutAct_9fa48("905") ? "" : (stryCov_9fa48("905"), "should find all contract"), async () => {
          if (stryMutAct_9fa48("906")) {
            {}
          } else {
            stryCov_9fa48("906");
            jest.spyOn(repository, stryMutAct_9fa48("907") ? "" : (stryCov_9fa48("907"), "find")).mockImplementation(stryMutAct_9fa48("908") ? () => undefined : (stryCov_9fa48("908"), async () => stryMutAct_9fa48("909") ? [] : (stryCov_9fa48("909"), [mockContract])));
            const result = await service.findAll();
            expect(result).toEqual(stryMutAct_9fa48("910") ? [] : (stryCov_9fa48("910"), [mockContract]));
          }
        });
        it(stryMutAct_9fa48("911") ? "" : (stryCov_9fa48("911"), "should find all contract with page"), async () => {
          if (stryMutAct_9fa48("912")) {
            {}
          } else {
            stryCov_9fa48("912");
            jest.spyOn(repository, stryMutAct_9fa48("913") ? "" : (stryCov_9fa48("913"), "find")).mockImplementation(stryMutAct_9fa48("914") ? () => undefined : (stryCov_9fa48("914"), async () => stryMutAct_9fa48("915") ? [] : (stryCov_9fa48("915"), [mockContract])));
            const result = await service.findAll(1);
            expect(result).toEqual(stryMutAct_9fa48("916") ? [] : (stryCov_9fa48("916"), [mockContract]));
          }
        });
      }
    });
    describe(stryMutAct_9fa48("917") ? "" : (stryCov_9fa48("917"), "create contract"), () => {
      if (stryMutAct_9fa48("918")) {
        {}
      } else {
        stryCov_9fa48("918");
        it(stryMutAct_9fa48("919") ? "" : (stryCov_9fa48("919"), "should create new Contract success"), async () => {
          if (stryMutAct_9fa48("920")) {
            {}
          } else {
            stryCov_9fa48("920");
            jest.spyOn(repository, stryMutAct_9fa48("921") ? "" : (stryCov_9fa48("921"), "create")).mockImplementation(dto => {
              if (stryMutAct_9fa48("922")) {
                {}
              } else {
                stryCov_9fa48("922");
                return ({
                  contract_id: dto.contract_id,
                  apartment_id: dto.apartment_id,
                  resident_id: dto.resident_id,
                  expire_at: dto.expire_at,
                  role: dto.role,
                  status: dto.status
                } as Contract);
              }
            });
            jest.spyOn(repository, stryMutAct_9fa48("923") ? "" : (stryCov_9fa48("923"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("924")) {
                {}
              } else {
                stryCov_9fa48("924");
                return ({
                  contract_id: dto.contract_id,
                  apartment_id: dto.apartment_id,
                  resident_id: dto.resident_id,
                  expire_at: dto.expire_at,
                  role: dto.role,
                  status: dto.status
                } as Contract);
              }
            });
            const result = await service.create(({
              apartment_id: mockContract.apartment_id,
              resident_id: mockContract.resident_id,
              expire_at: mockContract.expire_at,
              role: mockContract.role,
              status: mockContract.status
            } as CreateContractDto), mockContract.contract_id);
            expect(result).toEqual(stryMutAct_9fa48("925") ? {} : (stryCov_9fa48("925"), {
              contract_id: expect.any(String),
              apartment_id: mockContract.apartment_id,
              resident_id: mockContract.resident_id,
              expire_at: mockContract.expire_at,
              role: mockContract.role,
              status: mockContract.status
            }));
          }
        });
        it(stryMutAct_9fa48("926") ? "" : (stryCov_9fa48("926"), "should create new contract fail"), async () => {
          if (stryMutAct_9fa48("927")) {
            {}
          } else {
            stryCov_9fa48("927");
            try {
              if (stryMutAct_9fa48("928")) {
                {}
              } else {
                stryCov_9fa48("928");
                const result = await service.create(({
                  apartment_id: mockContract.apartment_id,
                  resident_id: mockContract.resident_id,
                  expire_at: mockContract.expire_at,
                  role: mockContract.role,
                  status: mockContract.status
                } as CreateContractDto), mockContract.contract_id);
              }
            } catch (err) {
              if (stryMutAct_9fa48("929")) {
                {}
              } else {
                stryCov_9fa48("929");
                expect(err.message).toBe(stryMutAct_9fa48("930") ? "" : (stryCov_9fa48("930"), 'No metadata for "Contract" was found.'));
              }
            }
          }
        });
      }
    });
    describe(stryMutAct_9fa48("931") ? "" : (stryCov_9fa48("931"), "Update contract"), () => {
      if (stryMutAct_9fa48("932")) {
        {}
      } else {
        stryCov_9fa48("932");
        it(stryMutAct_9fa48("933") ? "" : (stryCov_9fa48("933"), "should update Contract success"), async () => {
          if (stryMutAct_9fa48("934")) {
            {}
          } else {
            stryCov_9fa48("934");
            jest.spyOn(repository, stryMutAct_9fa48("935") ? "" : (stryCov_9fa48("935"), "update")).mockImplementation(async () => {
              if (stryMutAct_9fa48("936")) {
                {}
              } else {
                stryCov_9fa48("936");
                return mockUpdateResult;
              }
            });
            const result = await service.update(mockContract.contract_id, (mockContract as CreateContractDto));
            expect(result).toEqual(stryMutAct_9fa48("937") ? false : (stryCov_9fa48("937"), true));
          }
        });
        it(stryMutAct_9fa48("938") ? "" : (stryCov_9fa48("938"), "should update Contract success with image"), async () => {
          if (stryMutAct_9fa48("939")) {
            {}
          } else {
            stryCov_9fa48("939");
            jest.spyOn(repository, stryMutAct_9fa48("940") ? "" : (stryCov_9fa48("940"), "update")).mockImplementation(async () => {
              if (stryMutAct_9fa48("941")) {
                {}
              } else {
                stryCov_9fa48("941");
                return mockUpdateResult;
              }
            });
            console.log(image);
            const result = await service.update(mockContract.contract_id, ({
              ...(mockContract as CreateContractDto),
              imageUpdate: image
            } as UpdateContractDto));
            expect(result).toEqual(stryMutAct_9fa48("942") ? false : (stryCov_9fa48("942"), true));
          }
        });
      }
    });
    describe(stryMutAct_9fa48("943") ? "" : (stryCov_9fa48("943"), "Delete contract"), () => {
      if (stryMutAct_9fa48("944")) {
        {}
      } else {
        stryCov_9fa48("944");
        it(stryMutAct_9fa48("945") ? "" : (stryCov_9fa48("945"), "should delete Contract success"), async () => {
          if (stryMutAct_9fa48("946")) {
            {}
          } else {
            stryCov_9fa48("946");
            jest.spyOn(repository, stryMutAct_9fa48("947") ? "" : (stryCov_9fa48("947"), "softDelete")).mockImplementation(async () => {
              if (stryMutAct_9fa48("948")) {
                {}
              } else {
                stryCov_9fa48("948");
                return mockDeleteResult;
              }
            });
            const result = await service.remove(mockContract.contract_id);
            expect(result).toEqual(mockDeleteResult);
          }
        });
      }
    });
  }
});
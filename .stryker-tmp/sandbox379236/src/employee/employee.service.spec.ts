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
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Employee } from "./entities/employee.entity";
import { Account } from "../account/entities/account.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ResolveFnOutput } from "module";
import { StorageModule } from "../storage/storage.module";
import { HashModule } from "../hash/hash.module";
import { AvatarGeneratorModule } from "../avatar-generator/avatar-generator.module";
import multer from "multer";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { AccountService } from "../account/account.service";
import { CreateResidentDto } from "src/resident/dto/create-resident.dto";
import { readFileSync } from "fs";
import { isQueryAffected } from "../helper/validation";
describe(stryMutAct_9fa48("1125") ? "" : (stryCov_9fa48("1125"), "EmployeeService"), () => {
  if (stryMutAct_9fa48("1126")) {
    {}
  } else {
    stryCov_9fa48("1126");
    let service: EmployeeService;
    let accountService: AccountService;
    let employeeRepository: Repository<Employee>;
    const mockDeleteResult: DeleteResult = stryMutAct_9fa48("1127") ? {} : (stryCov_9fa48("1127"), {
      raw: stryMutAct_9fa48("1128") ? ["Stryker was here"] : (stryCov_9fa48("1128"), []),
      affected: 1
    });
    const image = ({
      buffer: readFileSync(process.cwd() + "/src/seed/room.jpg")
    } as MemoryStoredFile);
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("1129") ? {} : (stryCov_9fa48("1129"), {
      raw: stryMutAct_9fa48("1130") ? ["Stryker was here"] : (stryCov_9fa48("1130"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("1131") ? ["Stryker was here"] : (stryCov_9fa48("1131"), [])
    });
    const mockEmployeeRepository = stryMutAct_9fa48("1132") ? {} : (stryCov_9fa48("1132"), {
      softDelete: jest.fn().mockResolvedValue(mockUpdateResult)
    });
    const mockEmployee = ({
      id: "employee",
      profile: {
        date_of_birth: new Date(2022),
        name: "vobinh",
        gender: Gender.MALE,
        phone_number: "0978754723",
        front_identify_card_photo_URL: "employee/frontIdentifyPhoto.jpg",
        back_identify_card_photo_URL: "employee/backIdentifyPhoto.jpg"
      },
      profilePictureURL: "employee/avatar.svg"
    } as Employee);
    const RESIDENT_REPOSITORY_TOKEN = getRepositoryToken(Employee);
    beforeEach(async () => {
      if (stryMutAct_9fa48("1133")) {
        {}
      } else {
        stryCov_9fa48("1133");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1134") ? {} : (stryCov_9fa48("1134"), {
          imports: stryMutAct_9fa48("1135") ? [] : (stryCov_9fa48("1135"), [ConfigModule.forRoot(stryMutAct_9fa48("1136") ? {} : (stryCov_9fa48("1136"), {
            isGlobal: stryMutAct_9fa48("1137") ? false : (stryCov_9fa48("1137"), true)
          })), NestjsFormDataModule.config(stryMutAct_9fa48("1138") ? {} : (stryCov_9fa48("1138"), {
            isGlobal: stryMutAct_9fa48("1139") ? false : (stryCov_9fa48("1139"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1140") ? {} : (stryCov_9fa48("1140"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1141")) {
                {}
              } else {
                stryCov_9fa48("1141");
                if (stryMutAct_9fa48("1144") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1143") ? false : stryMutAct_9fa48("1142") ? true : (stryCov_9fa48("1142", "1143", "1144"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1145") ? "" : (stryCov_9fa48("1145"), "true")))) {
                  if (stryMutAct_9fa48("1146")) {
                    {}
                  } else {
                    stryCov_9fa48("1146");
                    return stryMutAct_9fa48("1147") ? {} : (stryCov_9fa48("1147"), {
                      type: stryMutAct_9fa48("1148") ? "" : (stryCov_9fa48("1148"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1149") ? false : (stryCov_9fa48("1149"), true),
                      entities: stryMutAct_9fa48("1150") ? [] : (stryCov_9fa48("1150"), [stryMutAct_9fa48("1151") ? "" : (stryCov_9fa48("1151"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1152") ? {} : (stryCov_9fa48("1152"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1153") ? "" : (stryCov_9fa48("1153"), "redis"),
                        options: stryMutAct_9fa48("1154") ? {} : (stryCov_9fa48("1154"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1155")) {
                    {}
                  } else {
                    stryCov_9fa48("1155");
                    return stryMutAct_9fa48("1156") ? {} : (stryCov_9fa48("1156"), {
                      type: stryMutAct_9fa48("1157") ? "" : (stryCov_9fa48("1157"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1158") ? false : (stryCov_9fa48("1158"), true),
                      entities: stryMutAct_9fa48("1159") ? [] : (stryCov_9fa48("1159"), [stryMutAct_9fa48("1160") ? "" : (stryCov_9fa48("1160"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1161") ? {} : (stryCov_9fa48("1161"), {
                        type: stryMutAct_9fa48("1162") ? "" : (stryCov_9fa48("1162"), "redis"),
                        options: stryMutAct_9fa48("1163") ? {} : (stryCov_9fa48("1163"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("1164") ? [] : (stryCov_9fa48("1164"), [Employee])), IdGeneratorModule, StorageModule, HashModule, AvatarGeneratorModule, Repository<Employee>]),
          providers: stryMutAct_9fa48("1165") ? [] : (stryCov_9fa48("1165"), [EmployeeService])
        })).compile();
        employeeRepository = module.get<Repository<Employee>>(RESIDENT_REPOSITORY_TOKEN);
        service = module.get<EmployeeService>(EmployeeService);
      }
    }, 30000);
    it(stryMutAct_9fa48("1166") ? "" : (stryCov_9fa48("1166"), "should be defined"), () => {
      if (stryMutAct_9fa48("1167")) {
        {}
      } else {
        stryCov_9fa48("1167");
        expect(service).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("1168") ? "" : (stryCov_9fa48("1168"), "should repository be defined"), () => {
      if (stryMutAct_9fa48("1169")) {
        {}
      } else {
        stryCov_9fa48("1169");
        expect(employeeRepository).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1170") ? "" : (stryCov_9fa48("1170"), "Employee"), () => {
      if (stryMutAct_9fa48("1171")) {
        {}
      } else {
        stryCov_9fa48("1171");
        it(stryMutAct_9fa48("1172") ? "" : (stryCov_9fa48("1172"), "should find employee by id"), async () => {
          if (stryMutAct_9fa48("1173")) {
            {}
          } else {
            stryCov_9fa48("1173");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1174") ? "" : (stryCov_9fa48("1174"), "findOne")).mockImplementation(stryMutAct_9fa48("1175") ? () => undefined : (stryCov_9fa48("1175"), async () => mockEmployee));
            const result = await service.findOne(mockEmployee.id);
            //            expect(result).toEqual(mockEmployee);
          }
        });

        it(stryMutAct_9fa48("1176") ? "" : (stryCov_9fa48("1176"), "should find all employee"), async () => {
          if (stryMutAct_9fa48("1177")) {
            {}
          } else {
            stryCov_9fa48("1177");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1178") ? "" : (stryCov_9fa48("1178"), "find")).mockImplementation(stryMutAct_9fa48("1179") ? () => undefined : (stryCov_9fa48("1179"), async () => stryMutAct_9fa48("1180") ? [] : (stryCov_9fa48("1180"), [mockEmployee])));
            const result = await service.findAll();
            expect(result).toEqual(stryMutAct_9fa48("1181") ? [] : (stryCov_9fa48("1181"), [mockEmployee]));
          }
        });
        it(stryMutAct_9fa48("1182") ? "" : (stryCov_9fa48("1182"), "should create new employee with avatar photo"), async () => {
          if (stryMutAct_9fa48("1183")) {
            {}
          } else {
            stryCov_9fa48("1183");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1184") ? "" : (stryCov_9fa48("1184"), "create")).mockImplementation((entityLike: DeepPartial<Employee>) => {
              if (stryMutAct_9fa48("1185")) {
                {}
              } else {
                stryCov_9fa48("1185");
                const dto = (entityLike as CreateEmployeeDto);
                return ({
                  id: "fdsfds",
                  profile: {
                    date_of_birth: dto.date_of_birth,
                    name: dto.name,
                    gender: dto.gender,
                    phone_number: dto.phone_number,
                    front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                    back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg"
                  },
                  profilePictureURL: "resident/avatar.svg"
                } as Employee);
              }
            });
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1186") ? "" : (stryCov_9fa48("1186"), "save")).mockImplementation(async (dto: Employee) => {
              if (stryMutAct_9fa48("1187")) {
                {}
              } else {
                stryCov_9fa48("1187");
                return ({
                  id: "fdsfds",
                  profile: {
                    date_of_birth: dto.profile.date_of_birth,
                    name: dto.profile.name,
                    gender: dto.profile.gender,
                    phone_number: dto.profile.phone_number,
                    front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                    back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg"
                  }
                } as Employee);
              }
            });
            const result = await service.create(stryMutAct_9fa48("1188") ? {} : (stryCov_9fa48("1188"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1189") ? "" : (stryCov_9fa48("1189"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1190") ? "" : (stryCov_9fa48("1190"), "0978754723"),
              front_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              back_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              profile_picture: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile)
            }));
            expect(result).toEqual(stryMutAct_9fa48("1191") ? {} : (stryCov_9fa48("1191"), {
              id: expect.any(String),
              profile: stryMutAct_9fa48("1192") ? {} : (stryCov_9fa48("1192"), {
                date_of_birth: new Date(2022),
                name: stryMutAct_9fa48("1193") ? "" : (stryCov_9fa48("1193"), "vobinh"),
                gender: Gender.MALE,
                phone_number: stryMutAct_9fa48("1194") ? "" : (stryCov_9fa48("1194"), "0978754723"),
                front_identify_card_photo_URL: stryMutAct_9fa48("1195") ? "" : (stryCov_9fa48("1195"), "resident/frontIdentifyPhoto.jpg"),
                back_identify_card_photo_URL: stryMutAct_9fa48("1196") ? "" : (stryCov_9fa48("1196"), "resident/backIdentifyPhoto.jpg")
              })
            }));
          }
        }, 30000);
        it(stryMutAct_9fa48("1197") ? "" : (stryCov_9fa48("1197"), "should create new employee with error photo"), async () => {
          if (stryMutAct_9fa48("1198")) {
            {}
          } else {
            stryCov_9fa48("1198");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1199") ? "" : (stryCov_9fa48("1199"), "create")).mockImplementation((entityLike: DeepPartial<Employee>) => {
              if (stryMutAct_9fa48("1200")) {
                {}
              } else {
                stryCov_9fa48("1200");
                const dto = (entityLike as CreateEmployeeDto);
                return ({
                  id: "fdsfds",
                  profile: {
                    date_of_birth: dto.date_of_birth,
                    name: dto.name,
                    gender: dto.gender,
                    phone_number: dto.phone_number,
                    front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                    back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg"
                  },
                  profilePictureURL: "resident/avatar.svg"
                } as Employee);
              }
            });
            const err = new Error(stryMutAct_9fa48("1201") ? "" : (stryCov_9fa48("1201"), "Can not create employee"));
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1202") ? "" : (stryCov_9fa48("1202"), "save")).mockRejectedValue(err);
            await expect(service.create(stryMutAct_9fa48("1203") ? {} : (stryCov_9fa48("1203"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1204") ? "" : (stryCov_9fa48("1204"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1205") ? "" : (stryCov_9fa48("1205"), "0978754723"),
              front_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              back_identify_card_photo: ({
                mimetype: 'image/png',
                buffer: Buffer.from('')
              } as MemoryStoredFile),
              profile_picture: ({
                mimetype: 'image/png',
                buffer: Buffer.from('')
              } as MemoryStoredFile)
            }))).rejects.toThrow(err);
          }
        }, 30000);

        // it("should update", async () => {

        //         jest.spyOn(employeeRepository, 'update').mockResolvedValue(mockUpdateResult);

        //         const result = await service.updateEmployee("employee", {
        //                 phone_number: "0905091074",
        //                 front_identify_card_photo: new MemoryStoredFile,
        //                 back_identify_card_photo: new MemoryStoredFile
        //         });

        //         expect(result).toEqual(true);
        // });
        it(stryMutAct_9fa48("1206") ? "" : (stryCov_9fa48("1206"), "should update"), async () => {
          if (stryMutAct_9fa48("1207")) {
            {}
          } else {
            stryCov_9fa48("1207");
            const mockEmployeeId = stryMutAct_9fa48("1208") ? "" : (stryCov_9fa48("1208"), "employee");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1209") ? "" : (stryCov_9fa48("1209"), 'update')).mockImplementation(async (id, dto) => {
              if (stryMutAct_9fa48("1210")) {
                {}
              } else {
                stryCov_9fa48("1210");
                if (stryMutAct_9fa48("1213") ? id !== mockEmployeeId : stryMutAct_9fa48("1212") ? false : stryMutAct_9fa48("1211") ? true : (stryCov_9fa48("1211", "1212", "1213"), id === mockEmployeeId)) {}
                return stryMutAct_9fa48("1214") ? {} : (stryCov_9fa48("1214"), {
                  affected: 0,
                  generatedMaps: stryMutAct_9fa48("1215") ? ["Stryker was here"] : (stryCov_9fa48("1215"), []),
                  raw: stryMutAct_9fa48("1216") ? ["Stryker was here"] : (stryCov_9fa48("1216"), [])
                });
              }
            });
            const result = await service.update(mockEmployeeId, stryMutAct_9fa48("1217") ? {} : (stryCov_9fa48("1217"), {
              front_identify_card_photo: new MemoryStoredFile(),
              back_identify_card_photo: new MemoryStoredFile()
            }));
          }
        });
        it(stryMutAct_9fa48("1218") ? "" : (stryCov_9fa48("1218"), "should update success employee without avata photo with ft,bk"), async () => {
          if (stryMutAct_9fa48("1219")) {
            {}
          } else {
            stryCov_9fa48("1219");
            const mockEmployeeId = stryMutAct_9fa48("1220") ? "" : (stryCov_9fa48("1220"), "employee");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1221") ? "" : (stryCov_9fa48("1221"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1222")) {
                {}
              } else {
                stryCov_9fa48("1222");
                return mockEmployee;
              }
            });
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1223") ? "" : (stryCov_9fa48("1223"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1224")) {
                {}
              } else {
                stryCov_9fa48("1224");
                return mockEmployee;
              }
            });
            const result = await service.updateEmployee(mockEmployeeId, stryMutAct_9fa48("1225") ? {} : (stryCov_9fa48("1225"), {
              phone_number: stryMutAct_9fa48("1226") ? "" : (stryCov_9fa48("1226"), "0905091074"),
              front_identify_card_photo: image,
              back_identify_card_photo: image
            }));
            expect(result).toEqual(mockEmployee);
          }
        });
        it(stryMutAct_9fa48("1227") ? "" : (stryCov_9fa48("1227"), "should update success employee with avata photo without ft,bk"), async () => {
          if (stryMutAct_9fa48("1228")) {
            {}
          } else {
            stryCov_9fa48("1228");
            const mockEmployeeId = stryMutAct_9fa48("1229") ? "" : (stryCov_9fa48("1229"), "employee");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1230") ? "" : (stryCov_9fa48("1230"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1231")) {
                {}
              } else {
                stryCov_9fa48("1231");
                return mockEmployee;
              }
            });
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1232") ? "" : (stryCov_9fa48("1232"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1233")) {
                {}
              } else {
                stryCov_9fa48("1233");
                return mockEmployee;
              }
            });
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1234") ? "" : (stryCov_9fa48("1234"), 'update')).mockResolvedValue(mockUpdateResult);
            const result = await service.updateEmployee(mockEmployeeId, stryMutAct_9fa48("1235") ? {} : (stryCov_9fa48("1235"), {
              phone_number: stryMutAct_9fa48("1236") ? "" : (stryCov_9fa48("1236"), "0905091074"),
              profile_picture: image,
              front_identify_card_photo: image,
              back_identify_card_photo: image
            }));
            expect(result).toEqual(mockEmployee);
          }
        });
        it(stryMutAct_9fa48("1237") ? "" : (stryCov_9fa48("1237"), "should update success employee without avata photo with ft,bk"), async () => {
          if (stryMutAct_9fa48("1238")) {
            {}
          } else {
            stryCov_9fa48("1238");
            const mockEmployeeId = stryMutAct_9fa48("1239") ? "" : (stryCov_9fa48("1239"), "employee");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1240") ? "" : (stryCov_9fa48("1240"), 'update')).mockResolvedValue(mockUpdateResult);
            const result = await service.update(mockEmployeeId, stryMutAct_9fa48("1241") ? {} : (stryCov_9fa48("1241"), {
              front_identify_card_photo: new MemoryStoredFile(),
              back_identify_card_photo: new MemoryStoredFile()
            }));
            expect(result).toEqual(stryMutAct_9fa48("1242") ? false : (stryCov_9fa48("1242"), true));
          }
        });
        it(stryMutAct_9fa48("1243") ? "" : (stryCov_9fa48("1243"), "should delete  employee"), async () => {
          if (stryMutAct_9fa48("1244")) {
            {}
          } else {
            stryCov_9fa48("1244");
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1245") ? "" : (stryCov_9fa48("1245"), "softDelete")).mockImplementation(async () => {
              if (stryMutAct_9fa48("1246")) {
                {}
              } else {
                stryCov_9fa48("1246");
                return mockUpdateResult;
              }
            });
            const result = await service.delete(stryMutAct_9fa48("1247") ? "" : (stryCov_9fa48("1247"), "employee"));
            expect(result).toEqual(stryMutAct_9fa48("1248") ? false : (stryCov_9fa48("1248"), true));
          }
        });
        it(stryMutAct_9fa48("1249") ? "" : (stryCov_9fa48("1249"), "should delete new employee fail "), async () => {
          if (stryMutAct_9fa48("1250")) {
            {}
          } else {
            stryCov_9fa48("1250");
            const err = new Error(stryMutAct_9fa48("1251") ? "" : (stryCov_9fa48("1251"), "Can not delete employee"));
            jest.spyOn(employeeRepository, stryMutAct_9fa48("1252") ? "" : (stryCov_9fa48("1252"), "softDelete")).mockRejectedValue(err);
            await expect(service.delete(stryMutAct_9fa48("1253") ? "" : (stryCov_9fa48("1253"), "employeeId"))).rejects.toThrow(err);
          }
        });
      }
    });
  }
});
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
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Employee } from "./entities/employee.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository, EmployeeService } from "./employee.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { JwtModule } from "@nestjs/jwt";
import { readFileSync } from "fs";
describe(stryMutAct_9fa48("1017") ? "" : (stryCov_9fa48("1017"), "EmployeeController"), () => {
  if (stryMutAct_9fa48("1018")) {
    {}
  } else {
    stryCov_9fa48("1018");
    let controller: EmployeeController;
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("1019") ? {} : (stryCov_9fa48("1019"), {
      raw: stryMutAct_9fa48("1020") ? ["Stryker was here"] : (stryCov_9fa48("1020"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("1021") ? ["Stryker was here"] : (stryCov_9fa48("1021"), [])
    });
    const image = ({
      buffer: readFileSync(process.cwd() + "/src/seed/room.jpg")
    } as MemoryStoredFile);
    const mockEmployee = ({
      id: "emloyee",
      profile: {
        date_of_birth: new Date(2022),
        name: "vobinh",
        gender: Gender.MALE,
        phone_number: "0978754723",
        front_identify_card_photo_URL: "emloyee/frontIdentifyPhoto.jpg",
        back_identify_card_photo_URL: "emloyee/backIdentifyPhoto.jpg"
      },
      profilePictureURL: "emloyee/profilePicture.jpg"
    } as Employee);
    const mockEmployeeService = stryMutAct_9fa48("1022") ? {} : (stryCov_9fa48("1022"), {
      findOne: jest.fn().mockResolvedValue(mockEmployee).mockResolvedValue(new NotFoundException()),
      findAll: jest.fn().mockImplementation(stryMutAct_9fa48("1023") ? () => undefined : (stryCov_9fa48("1023"), () => stryMutAct_9fa48("1024") ? [] : (stryCov_9fa48("1024"), [mockEmployee]))),
      create: jest.fn().mockImplementation((dto: CreateEmployeeDto) => {
        if (stryMutAct_9fa48("1025")) {
          {}
        } else {
          stryCov_9fa48("1025");
          return stryMutAct_9fa48("1026") ? {} : (stryCov_9fa48("1026"), {
            id: stryMutAct_9fa48("1027") ? "" : (stryCov_9fa48("1027"), "fdsfds"),
            profile: stryMutAct_9fa48("1028") ? {} : (stryCov_9fa48("1028"), {
              date_of_birth: dto.date_of_birth,
              name: dto.name,
              gender: dto.gender,
              phone_number: dto.phone_number,
              front_identify_card_photo_URL: stryMutAct_9fa48("1029") ? "" : (stryCov_9fa48("1029"), "employee/frontIdentifyPhoto.jpg"),
              back_identify_card_photo_URL: stryMutAct_9fa48("1030") ? "" : (stryCov_9fa48("1030"), "employee/backIdentifyPhoto.jpg")
            }),
            profilePictureURL: stryMutAct_9fa48("1031") ? "" : (stryCov_9fa48("1031"), "emloyee/profilePicture.jpg"),
            role: stryMutAct_9fa48("1032") ? "" : (stryCov_9fa48("1032"), "employee")
          });
        }
      }),
      // findOne: jest.fn().mockImplementation((id) => mockEmployee),
      updateEmployee: jest.fn().mockImplementation((id, dto) => {
        if (stryMutAct_9fa48("1033")) {
          {}
        } else {
          stryCov_9fa48("1033");
          return stryMutAct_9fa48("1034") ? {} : (stryCov_9fa48("1034"), {
            id: stryMutAct_9fa48("1035") ? "" : (stryCov_9fa48("1035"), "employee"),
            profile: stryMutAct_9fa48("1036") ? {} : (stryCov_9fa48("1036"), {
              date_of_birth: mockEmployee.profile.date_of_birth,
              name: mockEmployee.profile.name,
              gender: mockEmployee.profile.gender,
              phone_number: dto.phone_number,
              front_identify_card_photo_URL: mockEmployee.profile.front_identify_card_photo_URL,
              back_identify_card_photo_URL: mockEmployee.profile.back_identify_card_photo_URL
            }),
            profilePictureURL: stryMutAct_9fa48("1037") ? "" : (stryCov_9fa48("1037"), "emloyee/profilePicture.jpg"),
            role: stryMutAct_9fa48("1038") ? "" : (stryCov_9fa48("1038"), "employee")
          });
        }
      }),
      search: jest.fn().mockImplementation(stryMutAct_9fa48("1039") ? () => undefined : (stryCov_9fa48("1039"), query => stryMutAct_9fa48("1040") ? [] : (stryCov_9fa48("1040"), [mockEmployee]))),
      delete: jest.fn().mockImplementation(id => {
        if (stryMutAct_9fa48("1041")) {
          {}
        } else {
          stryCov_9fa48("1041");
          return mockUpdateResult;
        }
      })
    });
    beforeEach(async () => {
      if (stryMutAct_9fa48("1042")) {
        {}
      } else {
        stryCov_9fa48("1042");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1043") ? {} : (stryCov_9fa48("1043"), {
          imports: stryMutAct_9fa48("1044") ? [] : (stryCov_9fa48("1044"), [NestjsFormDataModule.config(stryMutAct_9fa48("1045") ? {} : (stryCov_9fa48("1045"), {
            isGlobal: stryMutAct_9fa48("1046") ? false : (stryCov_9fa48("1046"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1047") ? {} : (stryCov_9fa48("1047"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1048")) {
                {}
              } else {
                stryCov_9fa48("1048");
                if (stryMutAct_9fa48("1051") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1050") ? false : stryMutAct_9fa48("1049") ? true : (stryCov_9fa48("1049", "1050", "1051"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1052") ? "" : (stryCov_9fa48("1052"), "true")))) {
                  if (stryMutAct_9fa48("1053")) {
                    {}
                  } else {
                    stryCov_9fa48("1053");
                    return stryMutAct_9fa48("1054") ? {} : (stryCov_9fa48("1054"), {
                      type: stryMutAct_9fa48("1055") ? "" : (stryCov_9fa48("1055"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1056") ? false : (stryCov_9fa48("1056"), true),
                      entities: stryMutAct_9fa48("1057") ? [] : (stryCov_9fa48("1057"), [stryMutAct_9fa48("1058") ? "" : (stryCov_9fa48("1058"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1059") ? {} : (stryCov_9fa48("1059"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1060") ? "" : (stryCov_9fa48("1060"), "redis"),
                        options: stryMutAct_9fa48("1061") ? {} : (stryCov_9fa48("1061"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1062")) {
                    {}
                  } else {
                    stryCov_9fa48("1062");
                    return stryMutAct_9fa48("1063") ? {} : (stryCov_9fa48("1063"), {
                      type: stryMutAct_9fa48("1064") ? "" : (stryCov_9fa48("1064"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1065") ? false : (stryCov_9fa48("1065"), true),
                      entities: stryMutAct_9fa48("1066") ? [] : (stryCov_9fa48("1066"), [stryMutAct_9fa48("1067") ? "" : (stryCov_9fa48("1067"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1068") ? {} : (stryCov_9fa48("1068"), {
                        type: stryMutAct_9fa48("1069") ? "" : (stryCov_9fa48("1069"), "redis"),
                        options: stryMutAct_9fa48("1070") ? {} : (stryCov_9fa48("1070"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("1071") ? [] : (stryCov_9fa48("1071"), [Employee])), AuthModule, StorageModule, IdGeneratorModule, JwtModule]),
          controllers: stryMutAct_9fa48("1072") ? [] : (stryCov_9fa48("1072"), [EmployeeController]),
          providers: stryMutAct_9fa48("1073") ? [] : (stryCov_9fa48("1073"), [EmployeeService, stryMutAct_9fa48("1074") ? {} : (stryCov_9fa48("1074"), {
            provide: EmployeeRepository,
            useValue: mockEmployeeService
            // useValue: {
            //   find: jest.fn().mockResolvedValue([]),
            //   findOne: jest.fn().mockResolvedValue(new Employee()),
            //   findAll: jest.fn().mockResolvedValue([new Employee()]),
            //   create: jest.fn().mockResolvedValue(new Employee()),
            //   updateEmployee: jest.fn().mockResolvedValue(new Employee()),
            //   delete: jest.fn().mockResolvedValue({ affected: 1 }),

            // },
          })])
        })).overrideProvider(EmployeeService).useValue(mockEmployeeService).compile();
        controller = module.get<EmployeeController>(EmployeeController);
      }
    }, 30000);
    it(stryMutAct_9fa48("1075") ? "" : (stryCov_9fa48("1075"), "should be defined"), () => {
      if (stryMutAct_9fa48("1076")) {
        {}
      } else {
        stryCov_9fa48("1076");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1077") ? "" : (stryCov_9fa48("1077"), "employee"), () => {
      if (stryMutAct_9fa48("1078")) {
        {}
      } else {
        stryCov_9fa48("1078");
        it(stryMutAct_9fa48("1079") ? "" : (stryCov_9fa48("1079"), "should find employee by id"), async () => {
          if (stryMutAct_9fa48("1080")) {
            {}
          } else {
            stryCov_9fa48("1080");
            const result = await controller.findOne(mockEmployee.id);
            expect(mockEmployeeService.findOne).toHaveBeenCalledWith(mockEmployee.id);
            //  expect(result).toEqual(mockEmployee);
          }
        });

        it(stryMutAct_9fa48("1081") ? "" : (stryCov_9fa48("1081"), "should not find employee by id"), async () => {
          if (stryMutAct_9fa48("1082")) {
            {}
          } else {
            stryCov_9fa48("1082");
            const err = new Error(stryMutAct_9fa48("1083") ? "" : (stryCov_9fa48("1083"), "employee not found"));
            jest.spyOn(mockEmployeeService, stryMutAct_9fa48("1084") ? "" : (stryCov_9fa48("1084"), "findOne")).mockRejectedValue(err);
            await expect(controller.findOne(stryMutAct_9fa48("1085") ? "Stryker was here!" : (stryCov_9fa48("1085"), ""))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("1086") ? "" : (stryCov_9fa48("1086"), "should find all employee"), async () => {
          if (stryMutAct_9fa48("1087")) {
            {}
          } else {
            stryCov_9fa48("1087");
            const result = await controller.findAll();
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual(stryMutAct_9fa48("1088") ? [] : (stryCov_9fa48("1088"), [mockEmployee]));
            expect(mockEmployeeService.findAll).toHaveBeenCalled();
          }
        });
        it(stryMutAct_9fa48("1089") ? "" : (stryCov_9fa48("1089"), "should not find all employee"), async () => {
          if (stryMutAct_9fa48("1090")) {
            {}
          } else {
            stryCov_9fa48("1090");
            const err = new Error(stryMutAct_9fa48("1091") ? "" : (stryCov_9fa48("1091"), "employee not found"));
            jest.spyOn(mockEmployeeService, stryMutAct_9fa48("1092") ? "" : (stryCov_9fa48("1092"), "findAll")).mockRejectedValue(err);
            await expect(controller.findAll()).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("1093") ? "" : (stryCov_9fa48("1093"), "should create new employee"), async () => {
          if (stryMutAct_9fa48("1094")) {
            {}
          } else {
            stryCov_9fa48("1094");
            const result = await controller.create(stryMutAct_9fa48("1095") ? {} : (stryCov_9fa48("1095"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1096") ? "" : (stryCov_9fa48("1096"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1097") ? "" : (stryCov_9fa48("1097"), "0978754723"),
              front_identify_card_photo: new MemoryStoredFile(),
              back_identify_card_photo: new MemoryStoredFile()
            }));
            expect(result).toEqual(stryMutAct_9fa48("1098") ? {} : (stryCov_9fa48("1098"), {
              id: expect.any(String),
              profile: stryMutAct_9fa48("1099") ? {} : (stryCov_9fa48("1099"), {
                date_of_birth: new Date(2022),
                name: stryMutAct_9fa48("1100") ? "" : (stryCov_9fa48("1100"), "vobinh"),
                gender: Gender.MALE,
                phone_number: stryMutAct_9fa48("1101") ? "" : (stryCov_9fa48("1101"), "0978754723"),
                front_identify_card_photo_URL: stryMutAct_9fa48("1102") ? "" : (stryCov_9fa48("1102"), "employee/frontIdentifyPhoto.jpg"),
                back_identify_card_photo_URL: stryMutAct_9fa48("1103") ? "" : (stryCov_9fa48("1103"), "employee/backIdentifyPhoto.jpg")
              }),
              profilePictureURL: stryMutAct_9fa48("1104") ? "" : (stryCov_9fa48("1104"), "emloyee/profilePicture.jpg"),
              role: stryMutAct_9fa48("1105") ? "" : (stryCov_9fa48("1105"), "employee")
            }));
          }
        });
        it(stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), "should update success employee"), async () => {
          if (stryMutAct_9fa48("1107")) {
            {}
          } else {
            stryCov_9fa48("1107");
            const result = await controller.updateEmployee(stryMutAct_9fa48("1108") ? "" : (stryCov_9fa48("1108"), "employee"), stryMutAct_9fa48("1109") ? {} : (stryCov_9fa48("1109"), {
              phone_number: stryMutAct_9fa48("1110") ? "" : (stryCov_9fa48("1110"), "0905091074"),
              front_identify_card_photo: new MemoryStoredFile(),
              back_identify_card_photo: new MemoryStoredFile()
            }));
            expect(result).toEqual(stryMutAct_9fa48("1111") ? {} : (stryCov_9fa48("1111"), {
              id: stryMutAct_9fa48("1112") ? "" : (stryCov_9fa48("1112"), "employee"),
              profile: stryMutAct_9fa48("1113") ? {} : (stryCov_9fa48("1113"), {
                date_of_birth: mockEmployee.profile.date_of_birth,
                name: mockEmployee.profile.name,
                gender: mockEmployee.profile.gender,
                phone_number: stryMutAct_9fa48("1114") ? "" : (stryCov_9fa48("1114"), "0905091074"),
                front_identify_card_photo_URL: mockEmployee.profile.front_identify_card_photo_URL,
                back_identify_card_photo_URL: mockEmployee.profile.back_identify_card_photo_URL
              }),
              profilePictureURL: stryMutAct_9fa48("1115") ? "" : (stryCov_9fa48("1115"), "emloyee/profilePicture.jpg"),
              role: stryMutAct_9fa48("1116") ? "" : (stryCov_9fa48("1116"), "employee")
            }));
          }
        });
        it(stryMutAct_9fa48("1117") ? "" : (stryCov_9fa48("1117"), "should delete success employee"), async () => {
          if (stryMutAct_9fa48("1118")) {
            {}
          } else {
            stryCov_9fa48("1118");
            const result = await controller.remove(stryMutAct_9fa48("1119") ? "" : (stryCov_9fa48("1119"), "employee"));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("1120") ? "" : (stryCov_9fa48("1120"), "should delete fail employee"), async () => {
          if (stryMutAct_9fa48("1121")) {
            {}
          } else {
            stryCov_9fa48("1121");
            const mError = new Error(stryMutAct_9fa48("1122") ? "" : (stryCov_9fa48("1122"), "Resident not found to delete"));
            jest.spyOn(mockEmployeeService, stryMutAct_9fa48("1123") ? "" : (stryCov_9fa48("1123"), "delete")).mockRejectedValue(mError);
            await expect(controller.remove(stryMutAct_9fa48("1124") ? "Stryker was here!" : (stryCov_9fa48("1124"), ""))).rejects.toThrow(mError);
          }
        });
      }
    });
  }
});
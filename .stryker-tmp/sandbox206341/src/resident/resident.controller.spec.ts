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
import { Resident } from "./entities/resident.entity";
import { Account } from "../account/entities/account.entity";
import { ResidentController } from "./resident.controller";
import { ResidentService } from "./resident.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { CreateResidentDto } from "./dto/create-resident.dto";
describe(stryMutAct_9fa48("1443") ? "" : (stryCov_9fa48("1443"), "ResidentController"), () => {
  if (stryMutAct_9fa48("1444")) {
    {}
  } else {
    stryCov_9fa48("1444");
    let controller: ResidentController;
    let service: ResidentService;
    const mockDeleteResult: DeleteResult = stryMutAct_9fa48("1445") ? {} : (stryCov_9fa48("1445"), {
      raw: stryMutAct_9fa48("1446") ? ["Stryker was here"] : (stryCov_9fa48("1446"), []),
      affected: 1
    });
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("1447") ? {} : (stryCov_9fa48("1447"), {
      raw: stryMutAct_9fa48("1448") ? ["Stryker was here"] : (stryCov_9fa48("1448"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("1449") ? ["Stryker was here"] : (stryCov_9fa48("1449"), [])
    });
    const mockResidentaHasAccount = ({
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
      }
    } as Resident);
    const mockResidentService = stryMutAct_9fa48("1450") ? {} : (stryCov_9fa48("1450"), {
      findAll: jest.fn().mockImplementation(stryMutAct_9fa48("1451") ? () => undefined : (stryCov_9fa48("1451"), () => stryMutAct_9fa48("1452") ? [] : (stryCov_9fa48("1452"), [mockResidentaHasAccount]))),
      create: jest.fn().mockImplementation((dto: CreateResidentDto) => {
        if (stryMutAct_9fa48("1453")) {
          {}
        } else {
          stryCov_9fa48("1453");
          return stryMutAct_9fa48("1454") ? {} : (stryCov_9fa48("1454"), {
            id: stryMutAct_9fa48("1455") ? "" : (stryCov_9fa48("1455"), "fdsfds"),
            profile: stryMutAct_9fa48("1456") ? {} : (stryCov_9fa48("1456"), {
              date_of_birth: dto.date_of_birth,
              name: dto.name,
              gender: dto.gender,
              phone_number: dto.phone_number,
              front_identify_card_photo_URL: stryMutAct_9fa48("1457") ? "" : (stryCov_9fa48("1457"), "resident/frontIdentifyPhoto.jpg"),
              back_identify_card_photo_URL: stryMutAct_9fa48("1458") ? "" : (stryCov_9fa48("1458"), "resident/backIdentifyPhoto.jpg")
            }),
            account: stryMutAct_9fa48("1459") ? {} : (stryCov_9fa48("1459"), {
              owner_id: stryMutAct_9fa48("1460") ? "" : (stryCov_9fa48("1460"), "resident"),
              email: stryMutAct_9fa48("1461") ? "" : (stryCov_9fa48("1461"), "resident@gmail.com"),
              password: dto.phone_number,
              avatarURL: stryMutAct_9fa48("1462") ? "" : (stryCov_9fa48("1462"), "resident/avatar.svg")
            })
          });
        }
      }),
      findOne: jest.fn().mockImplementation(stryMutAct_9fa48("1463") ? () => undefined : (stryCov_9fa48("1463"), id => mockResidentaHasAccount)),
      updateResident: jest.fn().mockImplementation((id, dto) => {
        if (stryMutAct_9fa48("1464")) {
          {}
        } else {
          stryCov_9fa48("1464");
          return stryMutAct_9fa48("1465") ? {} : (stryCov_9fa48("1465"), {
            id: stryMutAct_9fa48("1466") ? "" : (stryCov_9fa48("1466"), "resident"),
            profile: stryMutAct_9fa48("1467") ? {} : (stryCov_9fa48("1467"), {
              date_of_birth: mockResidentaHasAccount.profile.date_of_birth,
              name: mockResidentaHasAccount.profile.name,
              gender: mockResidentaHasAccount.profile.gender,
              phone_number: dto.phone_number,
              front_identify_card_photo_URL: mockResidentaHasAccount.profile.front_identify_card_photo_URL,
              back_identify_card_photo_URL: mockResidentaHasAccount.profile.back_identify_card_photo_URL
            }),
            account: stryMutAct_9fa48("1468") ? {} : (stryCov_9fa48("1468"), {
              owner_id: stryMutAct_9fa48("1469") ? "" : (stryCov_9fa48("1469"), "resident"),
              email: stryMutAct_9fa48("1470") ? "" : (stryCov_9fa48("1470"), "resident@gmail.com"),
              password: stryMutAct_9fa48("1471") ? "" : (stryCov_9fa48("1471"), "0978754723"),
              avatarURL: stryMutAct_9fa48("1472") ? "" : (stryCov_9fa48("1472"), "resident/avatar.svg")
            })
          });
        }
      }),
      search: jest.fn().mockImplementation(stryMutAct_9fa48("1473") ? () => undefined : (stryCov_9fa48("1473"), query => stryMutAct_9fa48("1474") ? [] : (stryCov_9fa48("1474"), [mockResidentaHasAccount]))),
      delete: jest.fn().mockImplementation(id => {
        if (stryMutAct_9fa48("1475")) {
          {}
        } else {
          stryCov_9fa48("1475");
          return mockUpdateResult;
        }
      })
    });
    beforeAll(async () => {
      if (stryMutAct_9fa48("1476")) {
        {}
      } else {
        stryCov_9fa48("1476");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1477") ? {} : (stryCov_9fa48("1477"), {
          imports: stryMutAct_9fa48("1478") ? [] : (stryCov_9fa48("1478"), [NestjsFormDataModule.config(stryMutAct_9fa48("1479") ? {} : (stryCov_9fa48("1479"), {
            isGlobal: stryMutAct_9fa48("1480") ? false : (stryCov_9fa48("1480"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1481") ? {} : (stryCov_9fa48("1481"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1482")) {
                {}
              } else {
                stryCov_9fa48("1482");
                if (stryMutAct_9fa48("1485") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1484") ? false : stryMutAct_9fa48("1483") ? true : (stryCov_9fa48("1483", "1484", "1485"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1486") ? "" : (stryCov_9fa48("1486"), "true")))) {
                  if (stryMutAct_9fa48("1487")) {
                    {}
                  } else {
                    stryCov_9fa48("1487");
                    return stryMutAct_9fa48("1488") ? {} : (stryCov_9fa48("1488"), {
                      type: stryMutAct_9fa48("1489") ? "" : (stryCov_9fa48("1489"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1490") ? false : (stryCov_9fa48("1490"), true),
                      entities: stryMutAct_9fa48("1491") ? [] : (stryCov_9fa48("1491"), [stryMutAct_9fa48("1492") ? "" : (stryCov_9fa48("1492"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1493") ? {} : (stryCov_9fa48("1493"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1494") ? "" : (stryCov_9fa48("1494"), "redis"),
                        options: stryMutAct_9fa48("1495") ? {} : (stryCov_9fa48("1495"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1496")) {
                    {}
                  } else {
                    stryCov_9fa48("1496");
                    return stryMutAct_9fa48("1497") ? {} : (stryCov_9fa48("1497"), {
                      type: stryMutAct_9fa48("1498") ? "" : (stryCov_9fa48("1498"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1499") ? false : (stryCov_9fa48("1499"), true),
                      entities: stryMutAct_9fa48("1500") ? [] : (stryCov_9fa48("1500"), [stryMutAct_9fa48("1501") ? "" : (stryCov_9fa48("1501"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1502") ? {} : (stryCov_9fa48("1502"), {
                        type: stryMutAct_9fa48("1503") ? "" : (stryCov_9fa48("1503"), "redis"),
                        options: stryMutAct_9fa48("1504") ? {} : (stryCov_9fa48("1504"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("1505") ? [] : (stryCov_9fa48("1505"), [Resident, Account])), IdGeneratorModule, Repository<Resident>]),
          controllers: stryMutAct_9fa48("1506") ? [] : (stryCov_9fa48("1506"), [ResidentController]),
          providers: stryMutAct_9fa48("1507") ? [] : (stryCov_9fa48("1507"), [ResidentService])
        })).overrideProvider(ResidentService).useValue(mockResidentService).compile();
        controller = module.get<ResidentController>(ResidentController);
      }
    }, 50000);
    it(stryMutAct_9fa48("1508") ? "" : (stryCov_9fa48("1508"), "should be defined"), () => {
      if (stryMutAct_9fa48("1509")) {
        {}
      } else {
        stryCov_9fa48("1509");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1510") ? "" : (stryCov_9fa48("1510"), "resident"), () => {
      if (stryMutAct_9fa48("1511")) {
        {}
      } else {
        stryCov_9fa48("1511");
        it(stryMutAct_9fa48("1512") ? "" : (stryCov_9fa48("1512"), "should find resident by id"), async () => {
          if (stryMutAct_9fa48("1513")) {
            {}
          } else {
            stryCov_9fa48("1513");
            const result = await controller.findOne(mockResidentaHasAccount.id);
            expect(mockResidentService.findOne).toHaveBeenCalledWith(mockResidentaHasAccount.id);
            expect(result).toEqual(mockResidentaHasAccount);
          }
        });
        it(stryMutAct_9fa48("1514") ? "" : (stryCov_9fa48("1514"), "should not find resident by id"), async () => {
          if (stryMutAct_9fa48("1515")) {
            {}
          } else {
            stryCov_9fa48("1515");
            const err = new Error(stryMutAct_9fa48("1516") ? "" : (stryCov_9fa48("1516"), "Resident not found"));
            jest.spyOn(mockResidentService, stryMutAct_9fa48("1517") ? "" : (stryCov_9fa48("1517"), "findOne")).mockRejectedValue(err);
            await expect(controller.findOne(stryMutAct_9fa48("1518") ? "Stryker was here!" : (stryCov_9fa48("1518"), ""))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("1519") ? "" : (stryCov_9fa48("1519"), "should find all resident"), async () => {
          if (stryMutAct_9fa48("1520")) {
            {}
          } else {
            stryCov_9fa48("1520");
            const result = await controller.findAll();
            // expect(buildingRepository.findOne).toHaveBeenCalledWith(mockBuilding.building_id)
            expect(result).toEqual(stryMutAct_9fa48("1521") ? [] : (stryCov_9fa48("1521"), [mockResidentaHasAccount]));
            expect(mockResidentService.findAll).toHaveBeenCalled();
          }
        });
        it(stryMutAct_9fa48("1522") ? "" : (stryCov_9fa48("1522"), "should create new resident"), async () => {
          if (stryMutAct_9fa48("1523")) {
            {}
          } else {
            stryCov_9fa48("1523");
            const result = await controller.create(stryMutAct_9fa48("1524") ? {} : (stryCov_9fa48("1524"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1525") ? "" : (stryCov_9fa48("1525"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1526") ? "" : (stryCov_9fa48("1526"), "0978754723"),
              front_identify_card_photo: new MemoryStoredFile(),
              back_identify_card_photo: new MemoryStoredFile()
            }));
            expect(result).toEqual(stryMutAct_9fa48("1527") ? {} : (stryCov_9fa48("1527"), {
              id: expect.any(String),
              profile: stryMutAct_9fa48("1528") ? {} : (stryCov_9fa48("1528"), {
                date_of_birth: new Date(2022),
                name: stryMutAct_9fa48("1529") ? "" : (stryCov_9fa48("1529"), "vobinh"),
                gender: Gender.MALE,
                phone_number: stryMutAct_9fa48("1530") ? "" : (stryCov_9fa48("1530"), "0978754723"),
                front_identify_card_photo_URL: stryMutAct_9fa48("1531") ? "" : (stryCov_9fa48("1531"), "resident/frontIdentifyPhoto.jpg"),
                back_identify_card_photo_URL: stryMutAct_9fa48("1532") ? "" : (stryCov_9fa48("1532"), "resident/backIdentifyPhoto.jpg")
              }),
              account: stryMutAct_9fa48("1533") ? {} : (stryCov_9fa48("1533"), {
                owner_id: stryMutAct_9fa48("1534") ? "" : (stryCov_9fa48("1534"), "resident"),
                email: stryMutAct_9fa48("1535") ? "" : (stryCov_9fa48("1535"), "resident@gmail.com"),
                password: stryMutAct_9fa48("1536") ? "" : (stryCov_9fa48("1536"), "0978754723"),
                avatarURL: stryMutAct_9fa48("1537") ? "" : (stryCov_9fa48("1537"), "resident/avatar.svg")
              })
            }));
          }
        });
        it(stryMutAct_9fa48("1538") ? "" : (stryCov_9fa48("1538"), "should update success resident"), async () => {
          if (stryMutAct_9fa48("1539")) {
            {}
          } else {
            stryCov_9fa48("1539");
            const result = await controller.updateResident(stryMutAct_9fa48("1540") ? "" : (stryCov_9fa48("1540"), "resident"), stryMutAct_9fa48("1541") ? {} : (stryCov_9fa48("1541"), {
              phone_number: stryMutAct_9fa48("1542") ? "" : (stryCov_9fa48("1542"), "0905091074")
            }));
            expect(result).toEqual(stryMutAct_9fa48("1543") ? {} : (stryCov_9fa48("1543"), {
              id: stryMutAct_9fa48("1544") ? "" : (stryCov_9fa48("1544"), "resident"),
              profile: stryMutAct_9fa48("1545") ? {} : (stryCov_9fa48("1545"), {
                date_of_birth: mockResidentaHasAccount.profile.date_of_birth,
                name: mockResidentaHasAccount.profile.name,
                gender: mockResidentaHasAccount.profile.gender,
                phone_number: stryMutAct_9fa48("1546") ? "" : (stryCov_9fa48("1546"), "0905091074"),
                front_identify_card_photo_URL: mockResidentaHasAccount.profile.front_identify_card_photo_URL,
                back_identify_card_photo_URL: mockResidentaHasAccount.profile.back_identify_card_photo_URL
              }),
              account: stryMutAct_9fa48("1547") ? {} : (stryCov_9fa48("1547"), {
                owner_id: stryMutAct_9fa48("1548") ? "" : (stryCov_9fa48("1548"), "resident"),
                email: stryMutAct_9fa48("1549") ? "" : (stryCov_9fa48("1549"), "resident@gmail.com"),
                password: stryMutAct_9fa48("1550") ? "" : (stryCov_9fa48("1550"), "0978754723"),
                avatarURL: stryMutAct_9fa48("1551") ? "" : (stryCov_9fa48("1551"), "resident/avatar.svg")
              })
            }));
          }
        });
        it(stryMutAct_9fa48("1552") ? "" : (stryCov_9fa48("1552"), "should update resident fail because id not found"), async () => {
          if (stryMutAct_9fa48("1553")) {
            {}
          } else {
            stryCov_9fa48("1553");
            const mError = new Error(stryMutAct_9fa48("1554") ? "" : (stryCov_9fa48("1554"), "Resident not found"));
            jest.spyOn(mockResidentService, stryMutAct_9fa48("1555") ? "" : (stryCov_9fa48("1555"), "updateResident")).mockRejectedValue(mError);
            await expect(controller.updateResident).rejects.toThrow(mError);
          }
        });
        it(stryMutAct_9fa48("1556") ? "" : (stryCov_9fa48("1556"), "should search resident"), async () => {
          if (stryMutAct_9fa48("1557")) {
            {}
          } else {
            stryCov_9fa48("1557");
            const result = await controller.searchResident(stryMutAct_9fa48("1558") ? "" : (stryCov_9fa48("1558"), "binh"));
            expect(result).toEqual(stryMutAct_9fa48("1559") ? [] : (stryCov_9fa48("1559"), [mockResidentaHasAccount]));
          }
        });
        it(stryMutAct_9fa48("1560") ? "" : (stryCov_9fa48("1560"), "should delete success resident"), async () => {
          if (stryMutAct_9fa48("1561")) {
            {}
          } else {
            stryCov_9fa48("1561");
            const result = await controller.softDeleteResident(stryMutAct_9fa48("1562") ? "" : (stryCov_9fa48("1562"), "resident"));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("1563") ? "" : (stryCov_9fa48("1563"), "should delete fail resident"), async () => {
          if (stryMutAct_9fa48("1564")) {
            {}
          } else {
            stryCov_9fa48("1564");
            const mError = new Error(stryMutAct_9fa48("1565") ? "" : (stryCov_9fa48("1565"), "Resident not found to delete"));
            jest.spyOn(mockResidentService, stryMutAct_9fa48("1566") ? "" : (stryCov_9fa48("1566"), "delete")).mockRejectedValue(mError);
            await expect(controller.softDeleteResident(stryMutAct_9fa48("1567") ? "Stryker was here!" : (stryCov_9fa48("1567"), ""))).rejects.toThrow(mError);
          }
        });
      }
    });
  }
});
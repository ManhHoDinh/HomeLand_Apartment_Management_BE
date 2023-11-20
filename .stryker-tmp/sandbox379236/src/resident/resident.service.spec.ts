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
import { ResolveFnOutput } from "module";
import { StorageModule } from "../storage/storage.module";
import { HashModule } from "../hash/hash.module";
import { AvatarGeneratorModule } from "../avatar-generator/avatar-generator.module";
import multer from "multer";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { AccountService } from "../account/account.service";
describe(stryMutAct_9fa48("1568") ? "" : (stryCov_9fa48("1568"), "ResidentController"), () => {
  if (stryMutAct_9fa48("1569")) {
    {}
  } else {
    stryCov_9fa48("1569");
    let service: ResidentService;
    let accountService: AccountService;
    let residentRepository: Repository<Resident>;
    let accountRepository: Repository<Account>;
    const mockDeleteResult: DeleteResult = stryMutAct_9fa48("1570") ? {} : (stryCov_9fa48("1570"), {
      raw: stryMutAct_9fa48("1571") ? ["Stryker was here"] : (stryCov_9fa48("1571"), []),
      affected: 1
    });
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("1572") ? {} : (stryCov_9fa48("1572"), {
      raw: stryMutAct_9fa48("1573") ? ["Stryker was here"] : (stryCov_9fa48("1573"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("1574") ? ["Stryker was here"] : (stryCov_9fa48("1574"), [])
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
    const RESIDENT_REPOSITORY_TOKEN = getRepositoryToken(Resident);
    const ACCOUNT_REPOSITORY_TOKEN = getRepositoryToken(Account);
    const mockAccount = ({
      owner_id: "resident",
      email: "resident@gmail.com",
      password: "0978754723",
      avatarURL: "resident/avatar.svg"
    } as Account);
    beforeAll(async () => {
      if (stryMutAct_9fa48("1575")) {
        {}
      } else {
        stryCov_9fa48("1575");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1576") ? {} : (stryCov_9fa48("1576"), {
          imports: stryMutAct_9fa48("1577") ? [] : (stryCov_9fa48("1577"), [ConfigModule.forRoot(stryMutAct_9fa48("1578") ? {} : (stryCov_9fa48("1578"), {
            isGlobal: stryMutAct_9fa48("1579") ? false : (stryCov_9fa48("1579"), true)
          })), NestjsFormDataModule.config(stryMutAct_9fa48("1580") ? {} : (stryCov_9fa48("1580"), {
            isGlobal: stryMutAct_9fa48("1581") ? false : (stryCov_9fa48("1581"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("1582") ? {} : (stryCov_9fa48("1582"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("1583")) {
                {}
              } else {
                stryCov_9fa48("1583");
                if (stryMutAct_9fa48("1586") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("1585") ? false : stryMutAct_9fa48("1584") ? true : (stryCov_9fa48("1584", "1585", "1586"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("1587") ? "" : (stryCov_9fa48("1587"), "true")))) {
                  if (stryMutAct_9fa48("1588")) {
                    {}
                  } else {
                    stryCov_9fa48("1588");
                    return stryMutAct_9fa48("1589") ? {} : (stryCov_9fa48("1589"), {
                      type: stryMutAct_9fa48("1590") ? "" : (stryCov_9fa48("1590"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("1591") ? false : (stryCov_9fa48("1591"), true),
                      entities: stryMutAct_9fa48("1592") ? [] : (stryCov_9fa48("1592"), [stryMutAct_9fa48("1593") ? "" : (stryCov_9fa48("1593"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("1594") ? {} : (stryCov_9fa48("1594"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("1595") ? "" : (stryCov_9fa48("1595"), "redis"),
                        options: stryMutAct_9fa48("1596") ? {} : (stryCov_9fa48("1596"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("1597")) {
                    {}
                  } else {
                    stryCov_9fa48("1597");
                    return stryMutAct_9fa48("1598") ? {} : (stryCov_9fa48("1598"), {
                      type: stryMutAct_9fa48("1599") ? "" : (stryCov_9fa48("1599"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("1600") ? false : (stryCov_9fa48("1600"), true),
                      entities: stryMutAct_9fa48("1601") ? [] : (stryCov_9fa48("1601"), [stryMutAct_9fa48("1602") ? "" : (stryCov_9fa48("1602"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("1603") ? {} : (stryCov_9fa48("1603"), {
                        type: stryMutAct_9fa48("1604") ? "" : (stryCov_9fa48("1604"), "redis"),
                        options: stryMutAct_9fa48("1605") ? {} : (stryCov_9fa48("1605"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("1606") ? [] : (stryCov_9fa48("1606"), [Resident, Account])), IdGeneratorModule, StorageModule, HashModule, AvatarGeneratorModule, Repository<Resident>, Repository<Account>]),
          providers: stryMutAct_9fa48("1607") ? [] : (stryCov_9fa48("1607"), [ResidentService, AccountService])
        })).compile();
        residentRepository = module.get<Repository<Resident>>(RESIDENT_REPOSITORY_TOKEN);
        accountRepository = module.get<Repository<Account>>(ACCOUNT_REPOSITORY_TOKEN);
        service = module.get<ResidentService>(ResidentService);
        accountService = module.get<AccountService>(AccountService);
      }
    }, 30000);
    it(stryMutAct_9fa48("1608") ? "" : (stryCov_9fa48("1608"), "should be defined"), () => {
      if (stryMutAct_9fa48("1609")) {
        {}
      } else {
        stryCov_9fa48("1609");
        expect(service).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("1610") ? "" : (stryCov_9fa48("1610"), "should repository be defined"), () => {
      if (stryMutAct_9fa48("1611")) {
        {}
      } else {
        stryCov_9fa48("1611");
        expect(residentRepository).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1612") ? "" : (stryCov_9fa48("1612"), "resident"), () => {
      if (stryMutAct_9fa48("1613")) {
        {}
      } else {
        stryCov_9fa48("1613");
        it(stryMutAct_9fa48("1614") ? "" : (stryCov_9fa48("1614"), "should find resident by id"), async () => {
          if (stryMutAct_9fa48("1615")) {
            {}
          } else {
            stryCov_9fa48("1615");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1616") ? "" : (stryCov_9fa48("1616"), "findOne")).mockImplementation(stryMutAct_9fa48("1617") ? () => undefined : (stryCov_9fa48("1617"), async () => mockResidentaHasAccount));
            const result = await service.findOne(mockResidentaHasAccount.id);
            expect(result).toEqual(mockResidentaHasAccount);
          }
        });
        it(stryMutAct_9fa48("1618") ? "" : (stryCov_9fa48("1618"), "should find all resident"), async () => {
          if (stryMutAct_9fa48("1619")) {
            {}
          } else {
            stryCov_9fa48("1619");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1620") ? "" : (stryCov_9fa48("1620"), "find")).mockImplementation(stryMutAct_9fa48("1621") ? () => undefined : (stryCov_9fa48("1621"), async () => stryMutAct_9fa48("1622") ? [] : (stryCov_9fa48("1622"), [mockResidentaHasAccount])));
            const result = await service.findAll();
            expect(result).toEqual(stryMutAct_9fa48("1623") ? [] : (stryCov_9fa48("1623"), [mockResidentaHasAccount]));
          }
        });
        it(stryMutAct_9fa48("1624") ? "" : (stryCov_9fa48("1624"), "should create new resident with avatar photo"), async () => {
          if (stryMutAct_9fa48("1625")) {
            {}
          } else {
            stryCov_9fa48("1625");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1626") ? "" : (stryCov_9fa48("1626"), "create")).mockImplementation((dto: CreateResidentDto) => {
              if (stryMutAct_9fa48("1627")) {
                {}
              } else {
                stryCov_9fa48("1627");
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
                  account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: dto.phone_number,
                    avatarURL: "resident/avatar.svg"
                  }
                } as Resident);
              }
            });
            jest.spyOn(residentRepository, stryMutAct_9fa48("1628") ? "" : (stryCov_9fa48("1628"), "save")).mockImplementation(async (dto: Resident) => {
              if (stryMutAct_9fa48("1629")) {
                {}
              } else {
                stryCov_9fa48("1629");
                return ({
                  id: "fdsfds",
                  profile: {
                    date_of_birth: dto.profile.date_of_birth,
                    name: dto.profile.name,
                    gender: dto.profile.gender,
                    phone_number: dto.profile.phone_number,
                    front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                    back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg"
                  },
                  account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: dto.profile.phone_number,
                    avatarURL: "resident/avatar.svg"
                  }
                } as Resident);
              }
            });
            const result = await service.create(stryMutAct_9fa48("1630") ? {} : (stryCov_9fa48("1630"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1631") ? "" : (stryCov_9fa48("1631"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1632") ? "" : (stryCov_9fa48("1632"), "0978754723"),
              front_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              back_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              avatar_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile)
            }));
            expect(result).toEqual(stryMutAct_9fa48("1633") ? {} : (stryCov_9fa48("1633"), {
              id: expect.any(String),
              profile: stryMutAct_9fa48("1634") ? {} : (stryCov_9fa48("1634"), {
                date_of_birth: new Date(2022),
                name: stryMutAct_9fa48("1635") ? "" : (stryCov_9fa48("1635"), "vobinh"),
                gender: Gender.MALE,
                phone_number: stryMutAct_9fa48("1636") ? "" : (stryCov_9fa48("1636"), "0978754723"),
                front_identify_card_photo_URL: stryMutAct_9fa48("1637") ? "" : (stryCov_9fa48("1637"), "resident/frontIdentifyPhoto.jpg"),
                back_identify_card_photo_URL: stryMutAct_9fa48("1638") ? "" : (stryCov_9fa48("1638"), "resident/backIdentifyPhoto.jpg")
              }),
              account: stryMutAct_9fa48("1639") ? {} : (stryCov_9fa48("1639"), {
                owner_id: stryMutAct_9fa48("1640") ? "" : (stryCov_9fa48("1640"), "resident"),
                email: stryMutAct_9fa48("1641") ? "" : (stryCov_9fa48("1641"), "resident@gmail.com"),
                password: stryMutAct_9fa48("1642") ? "" : (stryCov_9fa48("1642"), "0978754723"),
                avatarURL: stryMutAct_9fa48("1643") ? "" : (stryCov_9fa48("1643"), "resident/avatar.svg")
              })
            }));
          }
        }, 30000);
        it(stryMutAct_9fa48("1644") ? "" : (stryCov_9fa48("1644"), "should create new resident with error photo"), async () => {
          if (stryMutAct_9fa48("1645")) {
            {}
          } else {
            stryCov_9fa48("1645");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1646") ? "" : (stryCov_9fa48("1646"), "create")).mockImplementation((dto: CreateResidentDto) => {
              if (stryMutAct_9fa48("1647")) {
                {}
              } else {
                stryCov_9fa48("1647");
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
                  account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: dto.phone_number,
                    avatarURL: "resident/avatar.svg"
                  }
                } as Resident);
              }
            });
            const err = new Error(stryMutAct_9fa48("1648") ? "" : (stryCov_9fa48("1648"), "Can not create resident"));
            jest.spyOn(residentRepository, stryMutAct_9fa48("1649") ? "" : (stryCov_9fa48("1649"), "save")).mockRejectedValue(err);
            await expect(service.create(stryMutAct_9fa48("1650") ? {} : (stryCov_9fa48("1650"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1651") ? "" : (stryCov_9fa48("1651"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1652") ? "" : (stryCov_9fa48("1652"), "0978754723"),
              front_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              back_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              avatar_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile)
            }))).rejects.toThrow(err);
          }
        }, 30000);
        it(stryMutAct_9fa48("1653") ? "" : (stryCov_9fa48("1653"), "should create new resident with avata photo and create new account with email"), async () => {
          if (stryMutAct_9fa48("1654")) {
            {}
          } else {
            stryCov_9fa48("1654");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1655") ? "" : (stryCov_9fa48("1655"), "create")).mockImplementation((dto: CreateResidentDto) => {
              if (stryMutAct_9fa48("1656")) {
                {}
              } else {
                stryCov_9fa48("1656");
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
                  account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: dto.phone_number,
                    avatarURL: "resident/avatar.svg"
                  }
                } as Resident);
              }
            });
            jest.spyOn(residentRepository, stryMutAct_9fa48("1657") ? "" : (stryCov_9fa48("1657"), "save")).mockImplementation(async (dto: Resident) => {
              if (stryMutAct_9fa48("1658")) {
                {}
              } else {
                stryCov_9fa48("1658");
                return ({
                  id: "fdsfds",
                  profile: {
                    date_of_birth: dto.profile.date_of_birth,
                    name: dto.profile.name,
                    gender: dto.profile.gender,
                    phone_number: dto.profile.phone_number,
                    front_identify_card_photo_URL: "resident/frontIdentifyPhoto.jpg",
                    back_identify_card_photo_URL: "resident/backIdentifyPhoto.jpg"
                  },
                  account: {
                    owner_id: "resident",
                    email: "resident@gmail.com",
                    password: dto.profile.phone_number,
                    avatarURL: "resident/avatar.svg"
                  }
                } as Resident);
              }
            });
            jest.spyOn(accountRepository, stryMutAct_9fa48("1659") ? "" : (stryCov_9fa48("1659"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1660")) {
                {}
              } else {
                stryCov_9fa48("1660");
                return mockAccount;
              }
            });
            jest.spyOn(accountRepository, stryMutAct_9fa48("1661") ? "" : (stryCov_9fa48("1661"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1662")) {
                {}
              } else {
                stryCov_9fa48("1662");
                return mockAccount;
              }
            });
            const resultAccount = await accountRepository.save(mockAccount);
            expect(resultAccount).toEqual(mockAccount);
            const result = await service.create(stryMutAct_9fa48("1663") ? {} : (stryCov_9fa48("1663"), {
              date_of_birth: new Date(2022),
              name: stryMutAct_9fa48("1664") ? "" : (stryCov_9fa48("1664"), "vobinh"),
              gender: Gender.MALE,
              phone_number: stryMutAct_9fa48("1665") ? "" : (stryCov_9fa48("1665"), "0978754723"),
              front_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              back_identify_card_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              avatar_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile),
              email: stryMutAct_9fa48("1666") ? "" : (stryCov_9fa48("1666"), "resident@gmail.com")
            }));
            expect(result).toEqual(stryMutAct_9fa48("1667") ? {} : (stryCov_9fa48("1667"), {
              id: expect.any(String),
              profile: stryMutAct_9fa48("1668") ? {} : (stryCov_9fa48("1668"), {
                date_of_birth: new Date(2022),
                name: stryMutAct_9fa48("1669") ? "" : (stryCov_9fa48("1669"), "vobinh"),
                gender: Gender.MALE,
                phone_number: stryMutAct_9fa48("1670") ? "" : (stryCov_9fa48("1670"), "0978754723"),
                front_identify_card_photo_URL: stryMutAct_9fa48("1671") ? "" : (stryCov_9fa48("1671"), "resident/frontIdentifyPhoto.jpg"),
                back_identify_card_photo_URL: stryMutAct_9fa48("1672") ? "" : (stryCov_9fa48("1672"), "resident/backIdentifyPhoto.jpg")
              }),
              account: stryMutAct_9fa48("1673") ? {} : (stryCov_9fa48("1673"), {
                owner_id: stryMutAct_9fa48("1674") ? "" : (stryCov_9fa48("1674"), "resident"),
                email: stryMutAct_9fa48("1675") ? "" : (stryCov_9fa48("1675"), "resident@gmail.com"),
                password: stryMutAct_9fa48("1676") ? "" : (stryCov_9fa48("1676"), "0978754723"),
                avatarURL: stryMutAct_9fa48("1677") ? "" : (stryCov_9fa48("1677"), "resident/avatar.svg")
              })
            }));
          }
        }, 30000);

        // it("should create new resi fail", async () => {
        //     const err = new BadRequestException("Create fail");
        //     jest.spyOn(service, "create").mockRejectedValue(err);
        //     await expect(service.create).rejects.toThrow(err);
        // });
        it(stryMutAct_9fa48("1678") ? "" : (stryCov_9fa48("1678"), "should update "), async () => {
          if (stryMutAct_9fa48("1679")) {
            {}
          } else {
            stryCov_9fa48("1679");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1680") ? "" : (stryCov_9fa48("1680"), "update")).mockImplementation(async (id, dto) => {
              if (stryMutAct_9fa48("1681")) {
                {}
              } else {
                stryCov_9fa48("1681");
                return mockUpdateResult;
              }
            });
            const result = await service.update(stryMutAct_9fa48("1682") ? "" : (stryCov_9fa48("1682"), "resident"), stryMutAct_9fa48("1683") ? {} : (stryCov_9fa48("1683"), {
              phone_number: stryMutAct_9fa48("1684") ? "" : (stryCov_9fa48("1684"), "0905091074")
            }));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("1685") ? "" : (stryCov_9fa48("1685"), "should update success resident without avata photo"), async () => {
          if (stryMutAct_9fa48("1686")) {
            {}
          } else {
            stryCov_9fa48("1686");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1687") ? "" : (stryCov_9fa48("1687"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1688")) {
                {}
              } else {
                stryCov_9fa48("1688");
                return mockResidentaHasAccount;
              }
            });
            jest.spyOn(residentRepository, stryMutAct_9fa48("1689") ? "" : (stryCov_9fa48("1689"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1690")) {
                {}
              } else {
                stryCov_9fa48("1690");
                return mockResidentaHasAccount;
              }
            });
            jest.spyOn(accountRepository, stryMutAct_9fa48("1691") ? "" : (stryCov_9fa48("1691"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1692")) {
                {}
              } else {
                stryCov_9fa48("1692");
                return mockAccount;
              }
            });
            jest.spyOn(accountRepository, stryMutAct_9fa48("1693") ? "" : (stryCov_9fa48("1693"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1694")) {
                {}
              } else {
                stryCov_9fa48("1694");
                return mockAccount;
              }
            });
            const result = await service.updateResident(stryMutAct_9fa48("1695") ? "" : (stryCov_9fa48("1695"), "resident"), stryMutAct_9fa48("1696") ? {} : (stryCov_9fa48("1696"), {
              phone_number: stryMutAct_9fa48("1697") ? "" : (stryCov_9fa48("1697"), "0905091074")
            }));
            const resultAccount = await accountRepository.save(mockAccount);
            expect(resultAccount).toEqual(mockAccount);
            expect(result).toEqual(mockResidentaHasAccount);
          }
        });
        it(stryMutAct_9fa48("1698") ? "" : (stryCov_9fa48("1698"), "should update success resident with avata photo"), async () => {
          if (stryMutAct_9fa48("1699")) {
            {}
          } else {
            stryCov_9fa48("1699");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1700") ? "" : (stryCov_9fa48("1700"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1701")) {
                {}
              } else {
                stryCov_9fa48("1701");
                return mockResidentaHasAccount;
              }
            });
            jest.spyOn(residentRepository, stryMutAct_9fa48("1702") ? "" : (stryCov_9fa48("1702"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1703")) {
                {}
              } else {
                stryCov_9fa48("1703");
                return mockResidentaHasAccount;
              }
            });
            jest.spyOn(accountRepository, stryMutAct_9fa48("1704") ? "" : (stryCov_9fa48("1704"), "save")).mockImplementation(async dto => {
              if (stryMutAct_9fa48("1705")) {
                {}
              } else {
                stryCov_9fa48("1705");
                return mockAccount;
              }
            });
            jest.spyOn(accountRepository, stryMutAct_9fa48("1706") ? "" : (stryCov_9fa48("1706"), "findOne")).mockImplementation(async id => {
              if (stryMutAct_9fa48("1707")) {
                {}
              } else {
                stryCov_9fa48("1707");
                return mockAccount;
              }
            });
            const result = await service.updateResident(stryMutAct_9fa48("1708") ? "" : (stryCov_9fa48("1708"), "resident"), stryMutAct_9fa48("1709") ? {} : (stryCov_9fa48("1709"), {
              phone_number: stryMutAct_9fa48("1710") ? "" : (stryCov_9fa48("1710"), "0905091074"),
              avatar_photo: ({
                mimetype: 'text/csv',
                buffer: Buffer.from('one,two,three')
              } as MemoryStoredFile)
            }));
            const resultAccount = await accountRepository.save(mockAccount);
            expect(resultAccount).toEqual(mockAccount);
            expect(result).toEqual(mockResidentaHasAccount);
          }
        });
        // it("should update building fail because id not found", async () => {
        //     try {
        //         const result = await service.update("", mockBuilding);
        //     } catch (e) {
        //         expect(e.message).toBe("Id not found.");
        //     }
        // });
        it(stryMutAct_9fa48("1711") ? "" : (stryCov_9fa48("1711"), "should search resident"), async () => {
          if (stryMutAct_9fa48("1712")) {
            {}
          } else {
            stryCov_9fa48("1712");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1713") ? "" : (stryCov_9fa48("1713"), "find")).mockImplementation(stryMutAct_9fa48("1714") ? () => undefined : (stryCov_9fa48("1714"), async () => stryMutAct_9fa48("1715") ? [] : (stryCov_9fa48("1715"), [mockResidentaHasAccount])));
            const result = await service.search(stryMutAct_9fa48("1716") ? "" : (stryCov_9fa48("1716"), "binh"));
            expect(result).toEqual(stryMutAct_9fa48("1717") ? [] : (stryCov_9fa48("1717"), [mockResidentaHasAccount]));
          }
        });
        it(stryMutAct_9fa48("1718") ? "" : (stryCov_9fa48("1718"), "should delete success resident"), async () => {
          if (stryMutAct_9fa48("1719")) {
            {}
          } else {
            stryCov_9fa48("1719");
            jest.spyOn(residentRepository, stryMutAct_9fa48("1720") ? "" : (stryCov_9fa48("1720"), "softDelete")).mockImplementation(async () => {
              if (stryMutAct_9fa48("1721")) {
                {}
              } else {
                stryCov_9fa48("1721");
                return mockUpdateResult;
              }
            });
            const result = await service.delete(stryMutAct_9fa48("1722") ? "" : (stryCov_9fa48("1722"), "resident"));
            expect(result).toEqual(mockUpdateResult);
          }
        });
        it(stryMutAct_9fa48("1723") ? "" : (stryCov_9fa48("1723"), "should delete new resident fail "), async () => {
          if (stryMutAct_9fa48("1724")) {
            {}
          } else {
            stryCov_9fa48("1724");
            const err = new Error(stryMutAct_9fa48("1725") ? "" : (stryCov_9fa48("1725"), "Can not delete resident"));
            jest.spyOn(residentRepository, stryMutAct_9fa48("1726") ? "" : (stryCov_9fa48("1726"), "softDelete")).mockRejectedValue(err);
            await expect(service.delete).rejects.toThrow(err);
          }
        });
      }
    });
  }
});
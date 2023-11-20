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
import { ApartmentService, ApartmentServiceImp } from "./apartment.service";
import { ApartmentController } from "./apartment.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeORMTestingModule } from "../../test-utils/TypeORMTestingModule";
import { Apartment } from "./entities/apartment.entity";
import { Floor } from "../floor/entities/floor.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { INestApplication, NotFoundException } from "@nestjs/common";
import { random } from "lodash";
import { Resident } from "../resident/entities/resident.entity";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { JwtModule } from "@nestjs/jwt";
describe(stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "ApartmentController"), () => {
  if (stryMutAct_9fa48("60")) {
    {}
  } else {
    stryCov_9fa48("60");
    let controller: ApartmentController;
    let service: ApartmentServiceImp;
    const mockDeleteResult: DeleteResult = stryMutAct_9fa48("61") ? {} : (stryCov_9fa48("61"), {
      raw: stryMutAct_9fa48("62") ? ["Stryker was here"] : (stryCov_9fa48("62"), []),
      affected: 1
    });
    const mockUpdateResult: UpdateResult = stryMutAct_9fa48("63") ? {} : (stryCov_9fa48("63"), {
      raw: stryMutAct_9fa48("64") ? ["Stryker was here"] : (stryCov_9fa48("64"), []),
      affected: 1,
      generatedMaps: stryMutAct_9fa48("65") ? ["Stryker was here"] : (stryCov_9fa48("65"), [])
    });
    const mockAparment = ({
      apartment_id: "APM3",
      width: 20,
      length: 20,
      number_of_bedroom: 2,
      number_of_bathroom: 2,
      rent: 5000000,
      description: "string",
      floor_id: "FLR1",
      building_id: "BLD1",
      name: "Aparment 3"
    } as Apartment);
    const mockAparmentservice = stryMutAct_9fa48("66") ? {} : (stryCov_9fa48("66"), {
      findAll: jest.fn().mockImplementation(stryMutAct_9fa48("67") ? () => undefined : (stryCov_9fa48("67"), () => stryMutAct_9fa48("68") ? [] : (stryCov_9fa48("68"), [mockAparment]))),
      create: jest.fn().mockImplementation(dto => {
        if (stryMutAct_9fa48("69")) {
          {}
        } else {
          stryCov_9fa48("69");
          return stryMutAct_9fa48("70") ? {} : (stryCov_9fa48("70"), {
            building_id: stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "BLD1"),
            max_floor: dto.max_floor,
            name: dto.name,
            apartment_id: stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), "fdvs"),
            width: dto.width,
            length: dto.length,
            number_of_bedroom: dto.number_of_bedroom,
            number_of_bathroom: dto.number_of_bathroom,
            rent: dto.rent,
            description: stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "string"),
            floor_id: stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "FLR1")
          });
        }
      }),
      findOne: jest.fn().mockImplementation(stryMutAct_9fa48("75") ? () => undefined : (stryCov_9fa48("75"), id => mockAparment)),
      update: jest.fn().mockImplementation((id, dto) => {
        if (stryMutAct_9fa48("76")) {
          {}
        } else {
          stryCov_9fa48("76");
          return mockUpdateResult;
        }
      }),
      search: jest.fn().mockImplementation(stryMutAct_9fa48("77") ? () => undefined : (stryCov_9fa48("77"), query => stryMutAct_9fa48("78") ? [] : (stryCov_9fa48("78"), [mockAparment]))),
      delete: jest.fn().mockImplementation(id => {
        if (stryMutAct_9fa48("79")) {
          {}
        } else {
          stryCov_9fa48("79");
          return mockUpdateResult;
        }
      })
    });
    beforeAll(async () => {
      if (stryMutAct_9fa48("80")) {
        {}
      } else {
        stryCov_9fa48("80");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
          imports: stryMutAct_9fa48("82") ? [] : (stryCov_9fa48("82"), [NestjsFormDataModule.config(stryMutAct_9fa48("83") ? {} : (stryCov_9fa48("83"), {
            isGlobal: stryMutAct_9fa48("84") ? false : (stryCov_9fa48("84"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("85") ? {} : (stryCov_9fa48("85"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("86")) {
                {}
              } else {
                stryCov_9fa48("86");
                if (stryMutAct_9fa48("89") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("88") ? false : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88", "89"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "true")))) {
                  if (stryMutAct_9fa48("91")) {
                    {}
                  } else {
                    stryCov_9fa48("91");
                    return stryMutAct_9fa48("92") ? {} : (stryCov_9fa48("92"), {
                      type: stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("94") ? false : (stryCov_9fa48("94"), true),
                      entities: stryMutAct_9fa48("95") ? [] : (stryCov_9fa48("95"), [stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("97") ? {} : (stryCov_9fa48("97"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "redis"),
                        options: stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("100")) {
                    {}
                  } else {
                    stryCov_9fa48("100");
                    return stryMutAct_9fa48("101") ? {} : (stryCov_9fa48("101"), {
                      type: stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("103") ? false : (stryCov_9fa48("103"), true),
                      entities: stryMutAct_9fa48("104") ? [] : (stryCov_9fa48("104"), [stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("106") ? {} : (stryCov_9fa48("106"), {
                        type: stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), "redis"),
                        options: stryMutAct_9fa48("108") ? {} : (stryCov_9fa48("108"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), TypeOrmModule.forFeature(stryMutAct_9fa48("109") ? [] : (stryCov_9fa48("109"), [Apartment, Resident])), IdGeneratorModule, AuthModule, StorageModule, JwtModule
          // Repository<Apartment>,
          ]),

          controllers: stryMutAct_9fa48("110") ? [] : (stryCov_9fa48("110"), [ApartmentController]),
          providers: stryMutAct_9fa48("111") ? [] : (stryCov_9fa48("111"), [ApartmentServiceImp, stryMutAct_9fa48("112") ? {} : (stryCov_9fa48("112"), {
            provide: ApartmentService,
            useValue: mockAparmentservice
            // useValue: {
            //   find: jest.fn().mockResolvedValue([]),
            //   findOne: jest.fn().mockResolvedValue(new Employee()),
            //   findAll: jest.fn().mockResolvedValue([new Employee()]),
            //   create: jest.fn().mockResolvedValue(new Employee()),
            //   updateEmployee: jest.fn().mockResolvedValue(new Employee()),
            //   delete: jest.fn().mockResolvedValue({ affected: 1 }),

            // },
          })])
        })).overrideProvider(ApartmentServiceImp).useValue(mockAparmentservice).compile();
        controller = module.get<ApartmentController>(ApartmentController);
      }
    }, 30000);
    it(stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), "should be defined"), () => {
      if (stryMutAct_9fa48("114")) {
        {}
      } else {
        stryCov_9fa48("114");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), "apartment"), () => {
      if (stryMutAct_9fa48("116")) {
        {}
      } else {
        stryCov_9fa48("116");
        it(stryMutAct_9fa48("117") ? "" : (stryCov_9fa48("117"), "should create new apartment"), async () => {
          if (stryMutAct_9fa48("118")) {
            {}
          } else {
            stryCov_9fa48("118");
            const mockCreatedApartment = stryMutAct_9fa48("119") ? {} : (stryCov_9fa48("119"), {
              apartment_id: stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "APM3"),
              building_id: stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), "BLD1"),
              description: stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), "string"),
              floor_id: stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), "FLR1"),
              length: 20,
              name: stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), "Aparment 3"),
              number_of_bathroom: 2,
              number_of_bedroom: 2,
              rent: 5000000,
              width: 20
            });
            jest.spyOn(mockAparmentservice, stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), 'create')).mockResolvedValue(mockCreatedApartment);
            const result = await controller.create(stryMutAct_9fa48("126") ? {} : (stryCov_9fa48("126"), {
              width: 20,
              length: 20,
              number_of_bedroom: 2,
              number_of_bathroom: 2,
              rent: 5000000,
              description: stryMutAct_9fa48("127") ? "" : (stryCov_9fa48("127"), "string"),
              floor_id: stryMutAct_9fa48("128") ? "" : (stryCov_9fa48("128"), "FLR1"),
              building_id: stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), "BLD1"),
              name: stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), "Aparment 3"),
              images: stryMutAct_9fa48("131") ? ["Stryker was here"] : (stryCov_9fa48("131"), [])
            }));
            expect(result).toEqual(mockCreatedApartment);
          }
        });
        it(stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), "should update success apartment"), async () => {
          if (stryMutAct_9fa48("133")) {
            {}
          } else {
            stryCov_9fa48("133");
            const mockUpdatedApartment = stryMutAct_9fa48("134") ? {} : (stryCov_9fa48("134"), {
              apartment_id: stryMutAct_9fa48("135") ? "" : (stryCov_9fa48("135"), "APM3"),
              building_id: stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), "BLD1"),
              description: stryMutAct_9fa48("137") ? "" : (stryCov_9fa48("137"), "string"),
              floor_id: stryMutAct_9fa48("138") ? "" : (stryCov_9fa48("138"), "FLR1"),
              length: 20,
              name: stryMutAct_9fa48("139") ? "" : (stryCov_9fa48("139"), "Aparment 3"),
              number_of_bathroom: 2,
              number_of_bedroom: 2,
              rent: 5000000,
              width: 20
            });
            jest.spyOn(mockAparmentservice, stryMutAct_9fa48("140") ? "" : (stryCov_9fa48("140"), 'update')).mockResolvedValue(mockUpdatedApartment);
            const result = await controller.update(stryMutAct_9fa48("141") ? "" : (stryCov_9fa48("141"), "APM3"), stryMutAct_9fa48("142") ? {} : (stryCov_9fa48("142"), {
              width: 20,
              length: 20,
              number_of_bedroom: 2,
              number_of_bathroom: 2,
              rent: 5000000,
              description: stryMutAct_9fa48("143") ? "" : (stryCov_9fa48("143"), "string"),
              floor_id: stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), "FLR1"),
              building_id: stryMutAct_9fa48("145") ? "" : (stryCov_9fa48("145"), "BLD1"),
              name: stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), "Aparment 3"),
              images: stryMutAct_9fa48("147") ? ["Stryker was here"] : (stryCov_9fa48("147"), [])
            }));
            expect(result).toEqual(mockUpdatedApartment);
          }
        });
        it(stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "should update apartment fail because id not found"), async () => {
          if (stryMutAct_9fa48("149")) {
            {}
          } else {
            stryCov_9fa48("149");
            const mError = new Error(stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), "apartment not found"));
            jest.spyOn(mockAparmentservice, stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), "update")).mockRejectedValue(mError);
            await expect(controller.update(stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "APM3"), {})).rejects.toThrow(mError);
          }
        });
        it(stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), "should find apartment by id"), async () => {
          if (stryMutAct_9fa48("154")) {
            {}
          } else {
            stryCov_9fa48("154");
            const result = await controller.findOne(mockAparment.apartment_id);
            expect(mockAparmentservice.findOne).toHaveBeenCalledWith(mockAparment.apartment_id);
            expect(result).toEqual(mockAparment);
          }
        });
        it(stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), "should not find aparment by id"), async () => {
          if (stryMutAct_9fa48("156")) {
            {}
          } else {
            stryCov_9fa48("156");
            const err = new NotFoundException(stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), "Apartment not found"));
            ;
            jest.spyOn(mockAparmentservice, stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), "findOne")).mockRejectedValue(err);
            await expect(controller.findOne(stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), "in-valid"))).rejects.toThrow(err);
          }
        });
        it(stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), "should find all apartment"), async () => {
          if (stryMutAct_9fa48("161")) {
            {}
          } else {
            stryCov_9fa48("161");
            const result = await controller.findAll(1);
            expect(result).toEqual(stryMutAct_9fa48("162") ? [] : (stryCov_9fa48("162"), [mockAparment]));
          }
        });
      }
    });
  }
});
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
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IdGeneratorModule } from './id-generator/id-generator.module';
import { StorageModule } from './storage/storage.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { ApartmentModule } from './apartment/apartment.module';
import { AvatarGeneratorModule } from './avatar-generator/avatar-generator.module';
import { BuildingModule } from './building/building.module';
import { ContractModule } from './contract/contract.module';
import { EmployeeModule } from './employee/employee.module';
import { HashModule } from './hash/hash.module';
import { MeModule } from './me/me.module';
import { ResidentModule } from './resident/resident.module';
import { SeedModule } from './seed/seed.module';
import { TokenModule } from './token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
describe(stryMutAct_9fa48("280") ? "" : (stryCov_9fa48("280"), 'AppController'), () => {
  if (stryMutAct_9fa48("281")) {
    {}
  } else {
    stryCov_9fa48("281");
    let controller: AppController;
    const mockAppService = stryMutAct_9fa48("282") ? {} : (stryCov_9fa48("282"), {
      getHello: jest.fn().mockImplementation(stryMutAct_9fa48("283") ? () => undefined : (stryCov_9fa48("283"), () => stryMutAct_9fa48("284") ? "" : (stryCov_9fa48("284"), "Hello World!")))
    });
    beforeEach(async () => {
      if (stryMutAct_9fa48("285")) {
        {}
      } else {
        stryCov_9fa48("285");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("286") ? {} : (stryCov_9fa48("286"), {
          imports: stryMutAct_9fa48("287") ? [] : (stryCov_9fa48("287"), [ConfigModule.forRoot(stryMutAct_9fa48("288") ? {} : (stryCov_9fa48("288"), {
            isGlobal: stryMutAct_9fa48("289") ? false : (stryCov_9fa48("289"), true)
          })), JwtModule.register(stryMutAct_9fa48("290") ? {} : (stryCov_9fa48("290"), {
            secret: process.env.ACCESS_TOKEN_SECRET,
            global: stryMutAct_9fa48("291") ? false : (stryCov_9fa48("291"), true)
          })), TypeOrmModule.forRootAsync(stryMutAct_9fa48("292") ? {} : (stryCov_9fa48("292"), {
            useFactory: async () => {
              if (stryMutAct_9fa48("293")) {
                {}
              } else {
                stryCov_9fa48("293");
                if (stryMutAct_9fa48("296") ? process.env.IS_PRODUCTION != "true" : stryMutAct_9fa48("295") ? false : stryMutAct_9fa48("294") ? true : (stryCov_9fa48("294", "295", "296"), process.env.IS_PRODUCTION == (stryMutAct_9fa48("297") ? "" : (stryCov_9fa48("297"), "true")))) {
                  if (stryMutAct_9fa48("298")) {
                    {}
                  } else {
                    stryCov_9fa48("298");
                    return stryMutAct_9fa48("299") ? {} : (stryCov_9fa48("299"), {
                      type: stryMutAct_9fa48("300") ? "" : (stryCov_9fa48("300"), "postgres"),
                      url: process.env.DB_URL,
                      synchronize: stryMutAct_9fa48("301") ? false : (stryCov_9fa48("301"), true),
                      entities: stryMutAct_9fa48("302") ? [] : (stryCov_9fa48("302"), [stryMutAct_9fa48("303") ? "" : (stryCov_9fa48("303"), "dist/**/*.entity{.ts,.js}")]),
                      cache: stryMutAct_9fa48("304") ? {} : (stryCov_9fa48("304"), {
                        duration: 5000,
                        type: stryMutAct_9fa48("305") ? "" : (stryCov_9fa48("305"), "redis"),
                        options: stryMutAct_9fa48("306") ? {} : (stryCov_9fa48("306"), {
                          url: process.env.REDIS_URL
                        })
                      })
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("307")) {
                    {}
                  } else {
                    stryCov_9fa48("307");
                    return stryMutAct_9fa48("308") ? {} : (stryCov_9fa48("308"), {
                      type: stryMutAct_9fa48("309") ? "" : (stryCov_9fa48("309"), "postgres"),
                      url: process.env.DB_LOCAL_URL,
                      synchronize: stryMutAct_9fa48("310") ? false : (stryCov_9fa48("310"), true),
                      entities: stryMutAct_9fa48("311") ? [] : (stryCov_9fa48("311"), [stryMutAct_9fa48("312") ? "" : (stryCov_9fa48("312"), "dist/**/*.entity{.ts,.js}")]),
                      duration: 5000,
                      cache: stryMutAct_9fa48("313") ? {} : (stryCov_9fa48("313"), {
                        type: stryMutAct_9fa48("314") ? "" : (stryCov_9fa48("314"), "redis"),
                        options: stryMutAct_9fa48("315") ? {} : (stryCov_9fa48("315"), {
                          url: process.env.REDIS_LOCAL_URL
                        })
                      })
                    });
                  }
                }
              }
            }
          })), AuthModule, IdGeneratorModule, StorageModule, HashModule, SeedModule, ApartmentModule, EmployeeModule, MeModule, TokenModule, ResidentModule, BuildingModule, ContractModule, AvatarGeneratorModule, NestjsFormDataModule.config(stryMutAct_9fa48("316") ? {} : (stryCov_9fa48("316"), {
            isGlobal: stryMutAct_9fa48("317") ? false : (stryCov_9fa48("317"), true)
          })), AccountModule, AdminModule]),
          controllers: stryMutAct_9fa48("318") ? [] : (stryCov_9fa48("318"), [AppController]),
          providers: stryMutAct_9fa48("319") ? [] : (stryCov_9fa48("319"), [AppService])
        })).overrideProvider(AppService).useValue(mockAppService).compile();
        controller = module.get<AppController>(AppController);
      }
    }, 30000);
    it(stryMutAct_9fa48("320") ? "" : (stryCov_9fa48("320"), 'should be defined'), () => {
      if (stryMutAct_9fa48("321")) {
        {}
      } else {
        stryCov_9fa48("321");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("322") ? "" : (stryCov_9fa48("322"), "App controller"), () => {
      if (stryMutAct_9fa48("323")) {
        {}
      } else {
        stryCov_9fa48("323");
        it(stryMutAct_9fa48("324") ? "" : (stryCov_9fa48("324"), "should console hello"), () => {
          if (stryMutAct_9fa48("325")) {
            {}
          } else {
            stryCov_9fa48("325");
            const result = controller.getHello();
            expect(result).toBe(stryMutAct_9fa48("326") ? "" : (stryCov_9fa48("326"), "Hello World!"));
          }
        });
      }
    });
  }
});
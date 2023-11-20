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
import { AuthController } from './auth.controller';
import { AuthService, AuthServiceImp } from './auth.service';
import { JWTAuthGuard } from './guard/jwt-auth.guard';
import { AuthModule } from './auth.module';
describe(stryMutAct_9fa48("341") ? "" : (stryCov_9fa48("341"), 'AuthController'), () => {
  if (stryMutAct_9fa48("342")) {
    {}
  } else {
    stryCov_9fa48("342");
    let controller: AuthController;
    const mockAuth = stryMutAct_9fa48("343") ? {} : (stryCov_9fa48("343"), {
      owner_id: stryMutAct_9fa48("344") ? "" : (stryCov_9fa48("344"), "RES"),
      email: stryMutAct_9fa48("345") ? "" : (stryCov_9fa48("345"), "resident@gmail.com"),
      password: stryMutAct_9fa48("346") ? "" : (stryCov_9fa48("346"), "password")
    });
    const mockAuthService = stryMutAct_9fa48("347") ? {} : (stryCov_9fa48("347"), {
      signIn: jest.fn().mockImplementation(async dto => {
        if (stryMutAct_9fa48("348")) {
          {}
        } else {
          stryCov_9fa48("348");
          return stryMutAct_9fa48("349") ? {} : (stryCov_9fa48("349"), {
            access_token: stryMutAct_9fa48("350") ? "" : (stryCov_9fa48("350"), "abc"),
            role: stryMutAct_9fa48("351") ? "" : (stryCov_9fa48("351"), "binh")
          });
        }
      })
    });
    beforeEach(async () => {
      if (stryMutAct_9fa48("352")) {
        {}
      } else {
        stryCov_9fa48("352");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("353") ? {} : (stryCov_9fa48("353"), {
          controllers: stryMutAct_9fa48("354") ? [] : (stryCov_9fa48("354"), [AuthController]),
          providers: stryMutAct_9fa48("355") ? [] : (stryCov_9fa48("355"), [AuthServiceImp])
        })).overrideProvider(AuthServiceImp).useValue(mockAuthService).compile();
        controller = module.get<AuthController>(AuthController);
      }
    });
    it(stryMutAct_9fa48("356") ? "" : (stryCov_9fa48("356"), 'should be defined'), () => {
      if (stryMutAct_9fa48("357")) {
        {}
      } else {
        stryCov_9fa48("357");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("358") ? "" : (stryCov_9fa48("358"), "account"), () => {
      if (stryMutAct_9fa48("359")) {
        {}
      } else {
        stryCov_9fa48("359");
        it(stryMutAct_9fa48("360") ? "" : (stryCov_9fa48("360"), "should sign in"), async () => {
          if (stryMutAct_9fa48("361")) {
            {}
          } else {
            stryCov_9fa48("361");
            const result = await controller.login(stryMutAct_9fa48("362") ? {} : (stryCov_9fa48("362"), {
              email: stryMutAct_9fa48("363") ? "" : (stryCov_9fa48("363"), 'abc@gmail.com'),
              password: stryMutAct_9fa48("364") ? "" : (stryCov_9fa48("364"), "abc")
            }));
            expect(result).toEqual(stryMutAct_9fa48("365") ? {} : (stryCov_9fa48("365"), {
              access_token: stryMutAct_9fa48("366") ? "" : (stryCov_9fa48("366"), "abc"),
              role: stryMutAct_9fa48("367") ? "" : (stryCov_9fa48("367"), "binh")
            }));
          }
        });
      }
    });
  }
});
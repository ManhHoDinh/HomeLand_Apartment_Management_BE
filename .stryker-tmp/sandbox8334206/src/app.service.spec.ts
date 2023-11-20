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
describe(stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), 'App service'), () => {
  if (stryMutAct_9fa48("328")) {
    {}
  } else {
    stryCov_9fa48("328");
    let service: AppService;
    beforeAll(async () => {
      if (stryMutAct_9fa48("329")) {
        {}
      } else {
        stryCov_9fa48("329");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("330") ? {} : (stryCov_9fa48("330"), {
          providers: stryMutAct_9fa48("331") ? [] : (stryCov_9fa48("331"), [AppService])
        })).compile();
        service = module.get<AppService>(AppService);
      }
    }, 30000);
    it(stryMutAct_9fa48("332") ? "" : (stryCov_9fa48("332"), 'should be defined'), () => {
      if (stryMutAct_9fa48("333")) {
        {}
      } else {
        stryCov_9fa48("333");
        expect(service).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("334") ? "" : (stryCov_9fa48("334"), "App service"), () => {
      if (stryMutAct_9fa48("335")) {
        {}
      } else {
        stryCov_9fa48("335");
        it(stryMutAct_9fa48("336") ? "" : (stryCov_9fa48("336"), "should find account by id"), () => {
          if (stryMutAct_9fa48("337")) {
            {}
          } else {
            stryCov_9fa48("337");
            // jest.spyOn(service, "getHello").mockImplementation(() => "Hello World!")
            const result = service.getHello();
            expect(result).toBe(stryMutAct_9fa48("338") ? "" : (stryCov_9fa48("338"), "Hello World!"));
          }
        });
      }
    });
  }
});
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
import { AccountService } from './account.service';
import { request } from 'http';
import { Account } from './entities/account.entity';
describe(stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), 'AccountService'), () => {
  if (stryMutAct_9fa48("27")) {
    {}
  } else {
    stryCov_9fa48("27");
    let service: AccountService;
    const mockAccount = ({
      owner_id: "RES",
      email: "resident@gmail.com",
      password: "password"
    } as Account);
    beforeEach(async () => {
      if (stryMutAct_9fa48("28")) {
        {}
      } else {
        stryCov_9fa48("28");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("29") ? {} : (stryCov_9fa48("29"), {
          providers: stryMutAct_9fa48("30") ? [] : (stryCov_9fa48("30"), [AccountService])
        })).compile();
        service = module.get<AccountService>(AccountService);
      }
    });
    it(stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), 'should be defined'), () => {
      if (stryMutAct_9fa48("32")) {
        {}
      } else {
        stryCov_9fa48("32");
        expect(service).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "account"), () => {
      if (stryMutAct_9fa48("34")) {
        {}
      } else {
        stryCov_9fa48("34");
        it(stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), "should find account by id"), () => {
          if (stryMutAct_9fa48("36")) {
            {}
          } else {
            stryCov_9fa48("36");
            const result = service.findOne(mockAccount.owner_id);
            expect(result).toEqual(stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "This action returns a #RES account"));
          }
        });
        it(stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "should find all account"), () => {
          if (stryMutAct_9fa48("39")) {
            {}
          } else {
            stryCov_9fa48("39");
            const result = service.findAll();
            expect(result).toBe(stryMutAct_9fa48("40") ? `` : (stryCov_9fa48("40"), `This action returns all account`));
          }
        });
        it(stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "should create new account"), () => {
          if (stryMutAct_9fa48("42")) {
            {}
          } else {
            stryCov_9fa48("42");
            const result = service.create(stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
              email: stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "resident@gmail.com"),
              password: stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "password")
            }));
            expect(result).toBe(stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), "This action adds a new account"));
          }
        });
        it(stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "should delete success account"), async () => {
          if (stryMutAct_9fa48("48")) {
            {}
          } else {
            stryCov_9fa48("48");
            const result = service.remove(stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), "RES"));
            expect(result).toBe(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "This action removes a #RES account"));
          }
        });
      }
    });
  }
});
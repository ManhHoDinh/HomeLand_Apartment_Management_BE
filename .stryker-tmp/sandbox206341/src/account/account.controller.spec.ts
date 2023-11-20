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
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
describe(stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), 'AccountController'), () => {
  if (stryMutAct_9fa48("1")) {
    {}
  } else {
    stryCov_9fa48("1");
    let controller: AccountController;
    const mockAccount = ({
      owner_id: "RES",
      email: "resident@gmail.com",
      password: "password"
    } as Account);
    beforeEach(async () => {
      if (stryMutAct_9fa48("2")) {
        {}
      } else {
        stryCov_9fa48("2");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("3") ? {} : (stryCov_9fa48("3"), {
          controllers: stryMutAct_9fa48("4") ? [] : (stryCov_9fa48("4"), [AccountController]),
          providers: stryMutAct_9fa48("5") ? [] : (stryCov_9fa48("5"), [AccountService])
        })).compile();
        controller = module.get<AccountController>(AccountController);
      }
    });
    it(stryMutAct_9fa48("6") ? "" : (stryCov_9fa48("6"), 'should be defined'), () => {
      if (stryMutAct_9fa48("7")) {
        {}
      } else {
        stryCov_9fa48("7");
        expect(controller).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "account"), () => {
      if (stryMutAct_9fa48("9")) {
        {}
      } else {
        stryCov_9fa48("9");
        it(stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "should find account by id"), () => {
          if (stryMutAct_9fa48("11")) {
            {}
          } else {
            stryCov_9fa48("11");
            const result = controller.findOne(mockAccount.owner_id);
            expect(result).toEqual(stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "This action returns a #RES account"));
          }
        });
        it(stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), "should find all account"), () => {
          if (stryMutAct_9fa48("14")) {
            {}
          } else {
            stryCov_9fa48("14");
            const result = controller.findAll();
            expect(result).toBe(stryMutAct_9fa48("15") ? `` : (stryCov_9fa48("15"), `This action returns all account`));
          }
        });
        it(stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), "should create new account"), async () => {
          if (stryMutAct_9fa48("17")) {
            {}
          } else {
            stryCov_9fa48("17");
            const result = controller.create(stryMutAct_9fa48("18") ? {} : (stryCov_9fa48("18"), {
              email: stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), "resident@gmail.com"),
              password: stryMutAct_9fa48("20") ? "" : (stryCov_9fa48("20"), "password")
            }));
            expect(result).toBe(stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), "This action adds a new account"));
          }
        });
        it(stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "should delete success account"), async () => {
          if (stryMutAct_9fa48("23")) {
            {}
          } else {
            stryCov_9fa48("23");
            const result = controller.remove(stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), "RES"));
            expect(result).toBe(stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "This action removes a #RES account"));
          }
        });
      }
    });
  }
});
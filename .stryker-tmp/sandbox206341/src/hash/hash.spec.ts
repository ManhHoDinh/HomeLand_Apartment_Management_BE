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
import { BcryptHashService } from './hash.service';
import * as bcrypt from 'bcrypt';
jest.mock(stryMutAct_9fa48("1365") ? "" : (stryCov_9fa48("1365"), 'bcrypt'), stryMutAct_9fa48("1366") ? () => undefined : (stryCov_9fa48("1366"), () => stryMutAct_9fa48("1367") ? {} : (stryCov_9fa48("1367"), {
  hashSync: jest.fn(),
  compareSync: jest.fn()
})));
describe(stryMutAct_9fa48("1368") ? "" : (stryCov_9fa48("1368"), 'BcryptHashService'), () => {
  if (stryMutAct_9fa48("1369")) {
    {}
  } else {
    stryCov_9fa48("1369");
    let service: BcryptHashService;
    beforeEach(() => {
      if (stryMutAct_9fa48("1370")) {
        {}
      } else {
        stryCov_9fa48("1370");
        service = new BcryptHashService();
      }
    });
    it(stryMutAct_9fa48("1371") ? "" : (stryCov_9fa48("1371"), 'should be defined'), () => {
      if (stryMutAct_9fa48("1372")) {
        {}
      } else {
        stryCov_9fa48("1372");
        expect(service).toBeDefined();
      }
    });
    describe(stryMutAct_9fa48("1373") ? "" : (stryCov_9fa48("1373"), 'hash'), () => {
      if (stryMutAct_9fa48("1374")) {
        {}
      } else {
        stryCov_9fa48("1374");
        it(stryMutAct_9fa48("1375") ? "" : (stryCov_9fa48("1375"), 'should return a hashed string'), () => {
          if (stryMutAct_9fa48("1376")) {
            {}
          } else {
            stryCov_9fa48("1376");
            const value = stryMutAct_9fa48("1377") ? "" : (stryCov_9fa48("1377"), 'test');
            (bcrypt.hashSync as jest.Mock).mockReturnValue(stryMutAct_9fa48("1378") ? "" : (stryCov_9fa48("1378"), 'hashedValue'));
            const result = service.hash(value);
            expect(bcrypt.hashSync).toHaveBeenCalledWith(value, expect.any(Number));
            expect(result).toBe(stryMutAct_9fa48("1379") ? "" : (stryCov_9fa48("1379"), 'hashedValue'));
          }
        });
      }
    });
    describe(stryMutAct_9fa48("1380") ? "" : (stryCov_9fa48("1380"), 'isMatch'), () => {
      if (stryMutAct_9fa48("1381")) {
        {}
      } else {
        stryCov_9fa48("1381");
        it(stryMutAct_9fa48("1382") ? "" : (stryCov_9fa48("1382"), 'should return true if the value matches the hash'), () => {
          if (stryMutAct_9fa48("1383")) {
            {}
          } else {
            stryCov_9fa48("1383");
            const value = stryMutAct_9fa48("1384") ? "" : (stryCov_9fa48("1384"), 'test');
            const hash = service.hash(value);
            (bcrypt.compareSync as jest.Mock).mockReturnValue(stryMutAct_9fa48("1385") ? false : (stryCov_9fa48("1385"), true));
            const result = service.isMatch(value, hash);
            expect(bcrypt.compareSync).toHaveBeenCalledWith(value, hash);
            expect(result).toBe(stryMutAct_9fa48("1386") ? false : (stryCov_9fa48("1386"), true));
          }
        });
        it(stryMutAct_9fa48("1387") ? "" : (stryCov_9fa48("1387"), 'should return false if the value does not match the hash'), () => {
          if (stryMutAct_9fa48("1388")) {
            {}
          } else {
            stryCov_9fa48("1388");
            const value = stryMutAct_9fa48("1389") ? "" : (stryCov_9fa48("1389"), 'test');
            const hash = service.hash(stryMutAct_9fa48("1390") ? "" : (stryCov_9fa48("1390"), 'different'));
            (bcrypt.compareSync as jest.Mock).mockReturnValue(stryMutAct_9fa48("1391") ? true : (stryCov_9fa48("1391"), false));
            const result = service.isMatch(value, hash);
            expect(result).toBe(stryMutAct_9fa48("1392") ? true : (stryCov_9fa48("1392"), false));
          }
        });
      }
    });
  }
});
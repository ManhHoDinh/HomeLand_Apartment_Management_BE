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
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { SupabaseClient } from "@supabase/supabase-js";
import { StorageModule } from "./storage.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupabaseStorageManager } from "./storage.service";
import { StorageManager } from "./storage.service";
import { StorageApiError } from "@supabase/storage-js";
describe(stryMutAct_9fa48("1980") ? "" : (stryCov_9fa48("1980"), "storage Service"), () => {
  if (stryMutAct_9fa48("1981")) {
    {}
  } else {
    stryCov_9fa48("1981");
    let storage: StorageManager;
    let supa: SupabaseClient;
    beforeAll(async () => {
      if (stryMutAct_9fa48("1982")) {
        {}
      } else {
        stryCov_9fa48("1982");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1983") ? {} : (stryCov_9fa48("1983"), {
          imports: stryMutAct_9fa48("1984") ? [] : (stryCov_9fa48("1984"), [StorageModule]),
          providers: stryMutAct_9fa48("1985") ? [] : (stryCov_9fa48("1985"), [stryMutAct_9fa48("1986") ? {} : (stryCov_9fa48("1986"), {
            provide: StorageManager,
            useValue: {}
          }), SupabaseStorageManager])
        })).compile();
        storage = module.get<StorageManager>(StorageManager);
        supa = module.get<SupabaseClient>(SupabaseClient);
      }
    }, 50000);
    it(stryMutAct_9fa48("1987") ? "" : (stryCov_9fa48("1987"), "should service be defined"), () => {
      if (stryMutAct_9fa48("1988")) {
        {}
      } else {
        stryCov_9fa48("1988");
        expect(storage).toBeDefined();
        expect(supa).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("1989") ? "" : (stryCov_9fa48("1989"), "should destroy"), async () => {
      if (stryMutAct_9fa48("1990")) {
        {}
      } else {
        stryCov_9fa48("1990");
        jest.spyOn(supa.storage, stryMutAct_9fa48("1991") ? "" : (stryCov_9fa48("1991"), "emptyBucket")).mockImplementation(async id => {
          if (stryMutAct_9fa48("1992")) {
            {}
          } else {
            stryCov_9fa48("1992");
            return stryMutAct_9fa48("1993") ? {} : (stryCov_9fa48("1993"), {
              data: stryMutAct_9fa48("1994") ? {} : (stryCov_9fa48("1994"), {
                message: stryMutAct_9fa48("1995") ? "" : (stryCov_9fa48("1995"), "success")
              }),
              error: null
            });
          }
        });
        jest.spyOn(supa.storage, stryMutAct_9fa48("1996") ? "" : (stryCov_9fa48("1996"), "deleteBucket")).mockImplementation(async id => {
          if (stryMutAct_9fa48("1997")) {
            {}
          } else {
            stryCov_9fa48("1997");
            return stryMutAct_9fa48("1998") ? {} : (stryCov_9fa48("1998"), {
              data: stryMutAct_9fa48("1999") ? {} : (stryCov_9fa48("1999"), {
                message: stryMutAct_9fa48("2000") ? "" : (stryCov_9fa48("2000"), "success")
              }),
              error: null
            });
          }
        });
        await storage.destroyStorage();
      }
    });
    it(stryMutAct_9fa48("2001") ? "" : (stryCov_9fa48("2001"), "should initial"), async () => {
      if (stryMutAct_9fa48("2002")) {
        {}
      } else {
        stryCov_9fa48("2002");
        jest.spyOn(supa.storage, stryMutAct_9fa48("2003") ? "" : (stryCov_9fa48("2003"), "createBucket")).mockImplementation(async id => {
          if (stryMutAct_9fa48("2004")) {
            {}
          } else {
            stryCov_9fa48("2004");
            return stryMutAct_9fa48("2005") ? {} : (stryCov_9fa48("2005"), {
              data: Buffer,
              error: null
            });
          }
        });
        await storage.initiateStorage();
      }
    });
  }
});
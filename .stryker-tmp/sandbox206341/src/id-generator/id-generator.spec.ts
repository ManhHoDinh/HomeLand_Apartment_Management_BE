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
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { ContractRole, ContractStatusRole } from "../helper/enums/contractEnum";
import { readFileSync } from "fs";
import { NotFoundException } from "@nestjs/common";
import { DatetimeGenerator, IdGenerator } from "./id-generator.service";
describe(stryMutAct_9fa48("1394") ? "" : (stryCov_9fa48("1394"), "IdGenerator"), () => {
  if (stryMutAct_9fa48("1395")) {
    {}
  } else {
    stryCov_9fa48("1395");
    let service: IdGenerator;
    beforeAll(async () => {
      if (stryMutAct_9fa48("1396")) {
        {}
      } else {
        stryCov_9fa48("1396");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("1397") ? {} : (stryCov_9fa48("1397"), {
          providers: stryMutAct_9fa48("1398") ? [] : (stryCov_9fa48("1398"), [stryMutAct_9fa48("1399") ? {} : (stryCov_9fa48("1399"), {
            provide: IdGenerator,
            useClass: DatetimeGenerator
          })])
        })).compile();
        service = module.get<IdGenerator>(IdGenerator);
      }
    }, 30000);
    it(stryMutAct_9fa48("1400") ? "" : (stryCov_9fa48("1400"), "should be defined"), () => {
      if (stryMutAct_9fa48("1401")) {
        {}
      } else {
        stryCov_9fa48("1401");
        expect(service).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("1402") ? "" : (stryCov_9fa48("1402"), "should generate id"), () => {
      if (stryMutAct_9fa48("1403")) {
        {}
      } else {
        stryCov_9fa48("1403");
        const id = service.generateId();
        expect(id).toBeDefined();
      }
    });
  }
});
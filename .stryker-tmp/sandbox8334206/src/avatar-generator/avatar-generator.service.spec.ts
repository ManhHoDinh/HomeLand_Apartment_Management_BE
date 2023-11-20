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
import { DiceBearAvatarGenerator } from "./avatar-generator.service";
const mockAvatar = ({} as ArrayBuffer);
describe(stryMutAct_9fa48("533") ? "" : (stryCov_9fa48("533"), "AvatarService"), () => {
  if (stryMutAct_9fa48("534")) {
    {}
  } else {
    stryCov_9fa48("534");
    let service: DiceBearAvatarGenerator;
    beforeAll(async () => {
      if (stryMutAct_9fa48("535")) {
        {}
      } else {
        stryCov_9fa48("535");
        const module: TestingModule = await Test.createTestingModule(stryMutAct_9fa48("536") ? {} : (stryCov_9fa48("536"), {
          providers: stryMutAct_9fa48("537") ? [] : (stryCov_9fa48("537"), [DiceBearAvatarGenerator])
        })).compile();
        service = module.get<DiceBearAvatarGenerator>(DiceBearAvatarGenerator);
      }
    }, 30000);
    it(stryMutAct_9fa48("538") ? "" : (stryCov_9fa48("538"), "should be defined"), () => {
      if (stryMutAct_9fa48("539")) {
        {}
      } else {
        stryCov_9fa48("539");
        expect(service).toBeDefined();
      }
    });
    it(stryMutAct_9fa48("540") ? "" : (stryCov_9fa48("540"), "should initialize createAvatar and collection onModuleInit"), async () => {
      if (stryMutAct_9fa48("541")) {
        {}
      } else {
        stryCov_9fa48("541");
        jest.spyOn(service, stryMutAct_9fa48("542") ? "" : (stryCov_9fa48("542"), "onModuleInit")).mockImplementation();
        await service.onModuleInit();
        expect(service.onModuleInit).toBeCalled();
      }
    });
    it(stryMutAct_9fa48("543") ? "" : (stryCov_9fa48("543"), "should be generateAvatar"), async () => {
      if (stryMutAct_9fa48("544")) {
        {}
      } else {
        stryCov_9fa48("544");
        jest.spyOn(service, stryMutAct_9fa48("545") ? "" : (stryCov_9fa48("545"), "generateAvatar")).mockImplementation(stryMutAct_9fa48("546") ? () => undefined : (stryCov_9fa48("546"), () => Promise.resolve(mockAvatar)));
        expect(service.generateAvatar(stryMutAct_9fa48("547") ? "" : (stryCov_9fa48("547"), "testSeed"))).resolves.toEqual(mockAvatar);
      }
    });
  }
});
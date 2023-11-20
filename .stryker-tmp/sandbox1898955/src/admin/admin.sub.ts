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
import { DataSource, EntitySubscriberInterface, EventSubscriber, Repository, SoftRemoveEvent } from "typeorm";
import { Account } from "../account/entities/account.entity";
import { Admin } from "./entities/admin.entity";
@EventSubscriber()
export class AdminSubscriber implements EntitySubscriberInterface<Admin> {
  constructor(dataSource: DataSource) {
    if (stryMutAct_9fa48("27")) {
      {}
    } else {
      stryCov_9fa48("27");
      dataSource.subscribers.push(this);
    }
  }
  listenTo() {
    if (stryMutAct_9fa48("28")) {
      {}
    } else {
      stryCov_9fa48("28");
      return Admin;
    }
  }
  private async disableAccount(admin: Admin, accountRepository: Repository<Account>) {
    if (stryMutAct_9fa48("29")) {
      {}
    } else {
      stryCov_9fa48("29");
      if (stryMutAct_9fa48("31") ? false : stryMutAct_9fa48("30") ? true : (stryCov_9fa48("30", "31"), admin.account)) await accountRepository.softRemove(admin.account);
    }
  }

  /**
   * Disable account when resident is sofr removed
   */
  async beforeSoftRemove(event: SoftRemoveEvent<Admin>) {
    if (stryMutAct_9fa48("32")) {
      {}
    } else {
      stryCov_9fa48("32");
      if (stryMutAct_9fa48("34") ? false : stryMutAct_9fa48("33") ? true : (stryCov_9fa48("33", "34"), event.entity)) await this.disableAccount(event.entity, event.manager.getRepository(Account));
    }
  }

  /**
   * Disable account when resident is removed
   */
  async beforeRemove(event: SoftRemoveEvent<Admin>) {
    if (stryMutAct_9fa48("35")) {
      {}
    } else {
      stryCov_9fa48("35");
      if (stryMutAct_9fa48("37") ? false : stryMutAct_9fa48("36") ? true : (stryCov_9fa48("36", "37"), event.entity)) await this.disableAccount(event.entity, event.manager.getRepository(Account));
    }
  }
}
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
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorator/roles.decorator";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    if (stryMutAct_9fa48("546")) {
      {}
    } else {
      stryCov_9fa48("546");
      const roles = this.reflector.getAllAndMerge(Roles, stryMutAct_9fa48("547") ? [] : (stryCov_9fa48("547"), [context.getHandler(), context.getClass()]));
      if (stryMutAct_9fa48("550") ? !roles && roles.length === 0 : stryMutAct_9fa48("549") ? false : stryMutAct_9fa48("548") ? true : (stryCov_9fa48("548", "549", "550"), (stryMutAct_9fa48("551") ? roles : (stryCov_9fa48("551"), !roles)) || (stryMutAct_9fa48("553") ? roles.length !== 0 : stryMutAct_9fa48("552") ? false : (stryCov_9fa48("552", "553"), roles.length === 0)))) {
        if (stryMutAct_9fa48("554")) {
          {}
        } else {
          stryCov_9fa48("554");
          return stryMutAct_9fa48("555") ? false : (stryCov_9fa48("555"), true);
        }
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const hasRole = stryMutAct_9fa48("556") ? () => undefined : (stryCov_9fa48("556"), (() => {
        const hasRole = () => roles.includes(user.role);
        return hasRole;
      })());
      const hasAuthority = stryMutAct_9fa48("559") ? user && user.role || hasRole() : stryMutAct_9fa48("558") ? false : stryMutAct_9fa48("557") ? true : (stryCov_9fa48("557", "558", "559"), (stryMutAct_9fa48("561") ? user || user.role : stryMutAct_9fa48("560") ? true : (stryCov_9fa48("560", "561"), user && user.role)) && hasRole());
      if (stryMutAct_9fa48("563") ? false : stryMutAct_9fa48("562") ? true : (stryCov_9fa48("562", "563"), hasAuthority)) return stryMutAct_9fa48("564") ? false : (stryCov_9fa48("564"), true);
      throw new ForbiddenException((stryMutAct_9fa48("565") ? "" : (stryCov_9fa48("565"), "Only ")) + roles.join(stryMutAct_9fa48("566") ? "" : (stryCov_9fa48("566"), ", ")) + (stryMutAct_9fa48("567") ? "" : (stryCov_9fa48("567"), " have permission")));
    }
  }
}
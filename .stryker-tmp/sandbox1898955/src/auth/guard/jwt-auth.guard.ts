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
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { AuthService, AuthServiceImp, TokenPayload } from "../auth.service";
@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthServiceImp, private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (stryMutAct_9fa48("249")) {
      {}
    } else {
      stryCov_9fa48("249");
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
    }
  }
  async validateRequest(request: any): Promise<boolean> {
    if (stryMutAct_9fa48("250")) {
      {}
    } else {
      stryCov_9fa48("250");
      if (stryMutAct_9fa48("252") ? false : stryMutAct_9fa48("251") ? true : (stryCov_9fa48("251", "252"), request.headers.authorization)) {
        if (stryMutAct_9fa48("253")) {
          {}
        } else {
          stryCov_9fa48("253");
          const token = request.headers.authorization.split(stryMutAct_9fa48("254") ? "" : (stryCov_9fa48("254"), " "))[1];
          if (stryMutAct_9fa48("256") ? false : stryMutAct_9fa48("255") ? true : (stryCov_9fa48("255", "256"), token)) {
            if (stryMutAct_9fa48("257")) {
              {}
            } else {
              stryCov_9fa48("257");
              try {
                if (stryMutAct_9fa48("258")) {
                  {}
                } else {
                  stryCov_9fa48("258");
                  const payload: TokenPayload = this.jwtService.verify(token);
                  const user = await this.authService.findOwnerById(payload.id);
                  if (stryMutAct_9fa48("261") ? false : stryMutAct_9fa48("260") ? true : stryMutAct_9fa48("259") ? user : (stryCov_9fa48("259", "260", "261"), !user)) throw new UnauthorizedException(stryMutAct_9fa48("262") ? "" : (stryCov_9fa48("262"), "Token invalid"));
                  request.user = user;
                  return stryMutAct_9fa48("263") ? false : (stryCov_9fa48("263"), true);
                }
              } catch (error) {
                if (stryMutAct_9fa48("264")) {
                  {}
                } else {
                  stryCov_9fa48("264");
                  if (stryMutAct_9fa48("266") ? false : stryMutAct_9fa48("265") ? true : (stryCov_9fa48("265", "266"), error instanceof TokenExpiredError)) {
                    if (stryMutAct_9fa48("267")) {
                      {}
                    } else {
                      stryCov_9fa48("267");
                      throw new UnauthorizedException(stryMutAct_9fa48("268") ? "" : (stryCov_9fa48("268"), "Token expired"));
                    }
                  } else if (stryMutAct_9fa48("270") ? false : stryMutAct_9fa48("269") ? true : (stryCov_9fa48("269", "270"), error instanceof JsonWebTokenError)) {
                    if (stryMutAct_9fa48("271")) {
                      {}
                    } else {
                      stryCov_9fa48("271");
                      throw new UnauthorizedException(stryMutAct_9fa48("272") ? "" : (stryCov_9fa48("272"), "Token invalid"));
                    }
                  }
                  console.error(error);
                  throw error;
                }
              }
            }
          }
        }
      }
      return stryMutAct_9fa48("273") ? true : (stryCov_9fa48("273"), false);
    }
  }
}
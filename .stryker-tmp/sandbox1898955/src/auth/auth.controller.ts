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
import { Controller, Post, Body } from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService, AuthServiceImp } from "./auth.service";
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthServiceImp) {}
  @ApiOperation({
    summary: "Sign in to get access token and account role"
  })
  @ApiCreatedResponse({
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            access_token: {
              type: "string",
              example: "eyJhbG..."
            },
            role: {
              type: "enum",
              enum: ["admin", "manager", "technician", "resident"]
            }
          }
        }
      }
    }
  })
  @Post("signin")
  async login(@Body()
  signInDto: SignInDto) {
    if (stryMutAct_9fa48("185")) {
      {}
    } else {
      stryCov_9fa48("185");
      return await this.authService.signIn(signInDto);
    }
  }
}
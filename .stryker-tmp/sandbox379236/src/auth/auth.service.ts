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
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../hash/hash.service";
import { SignInDto } from "./dto/signin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonRole } from "../helper/class/profile.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
import { Resident } from "../resident/entities/resident.entity";
import { Admin } from "../admin/entities/admin.entity";
import { Repository } from "typeorm";
import { Account } from "../account/entities/account.entity";
export class TokenPayload {
  id: string;
  role: PersonRole;
}
export abstract class AuthService {
  abstract signIn(signInDto: SignInDto, expiresIn?: string): Promise<{
    access_token: string;
    role: PersonRole;
  }>;
  abstract findOwnerByAccountEmail(email: string): Promise<Admin | Manager | Technician | Resident | null>;
  abstract findOwnerById(id: string): Promise<Admin | Manager | Technician | Resident | null>;
}
@Injectable()
export class AuthServiceImp extends AuthService {
  constructor(@InjectRepository(Account)
  private readonly accountRepository: Repository<Account>, private readonly jwtService: JwtService, private readonly hashService: HashService) {
    super();
  }
  async signIn(signInDto: SignInDto, expiresIn: string = stryMutAct_9fa48("470") ? "" : (stryCov_9fa48("470"), "30d")) {
    if (stryMutAct_9fa48("471")) {
      {}
    } else {
      stryCov_9fa48("471");
      let person = await this.findOwnerByAccountEmail(signInDto.email);
      console.log(person);
      if (stryMutAct_9fa48("474") ? (!person || !person.account) && !this.hashService.isMatch(signInDto.password, person.account.password) : stryMutAct_9fa48("473") ? false : stryMutAct_9fa48("472") ? true : (stryCov_9fa48("472", "473", "474"), (stryMutAct_9fa48("476") ? !person && !person.account : stryMutAct_9fa48("475") ? false : (stryCov_9fa48("475", "476"), (stryMutAct_9fa48("477") ? person : (stryCov_9fa48("477"), !person)) || (stryMutAct_9fa48("478") ? person.account : (stryCov_9fa48("478"), !person.account)))) || (stryMutAct_9fa48("479") ? this.hashService.isMatch(signInDto.password, person.account.password) : (stryCov_9fa48("479"), !this.hashService.isMatch(signInDto.password, person.account.password))))) {
        if (stryMutAct_9fa48("480")) {
          {}
        } else {
          stryCov_9fa48("480");
          throw new UnauthorizedException(stryMutAct_9fa48("481") ? "" : (stryCov_9fa48("481"), "Wrong email or password"));
        }
      }
      const payload: TokenPayload = stryMutAct_9fa48("482") ? {} : (stryCov_9fa48("482"), {
        id: person.id,
        role: person.role
      });
      return stryMutAct_9fa48("483") ? {} : (stryCov_9fa48("483"), {
        access_token: this.jwtService.sign(payload, stryMutAct_9fa48("484") ? {} : (stryCov_9fa48("484"), {
          expiresIn
        })),
        role: person.role
      });
    }
  }
  async findOwnerByAccountEmail(email: string): Promise<Admin | Manager | Technician | Resident | null> {
    if (stryMutAct_9fa48("485")) {
      {}
    } else {
      stryCov_9fa48("485");
      const account = await this.accountRepository.findOne(stryMutAct_9fa48("486") ? {} : (stryCov_9fa48("486"), {
        where: stryMutAct_9fa48("487") ? {} : (stryCov_9fa48("487"), {
          email
        }),
        relations: stryMutAct_9fa48("488") ? {} : (stryCov_9fa48("488"), {
          admin: stryMutAct_9fa48("489") ? {} : (stryCov_9fa48("489"), {
            account: stryMutAct_9fa48("490") ? false : (stryCov_9fa48("490"), true)
          }),
          resident: stryMutAct_9fa48("491") ? {} : (stryCov_9fa48("491"), {
            account: stryMutAct_9fa48("492") ? false : (stryCov_9fa48("492"), true)
          }),
          technician: stryMutAct_9fa48("493") ? {} : (stryCov_9fa48("493"), {
            account: stryMutAct_9fa48("494") ? false : (stryCov_9fa48("494"), true)
          }),
          manager: stryMutAct_9fa48("495") ? {} : (stryCov_9fa48("495"), {
            account: stryMutAct_9fa48("496") ? false : (stryCov_9fa48("496"), true)
          })
        })
      }));
      if (stryMutAct_9fa48("499") ? account !== null : stryMutAct_9fa48("498") ? false : stryMutAct_9fa48("497") ? true : (stryCov_9fa48("497", "498", "499"), account === null)) return null;else return stryMutAct_9fa48("502") ? (account.resident || account.admin || account.technician || account.manager) && null : stryMutAct_9fa48("501") ? false : stryMutAct_9fa48("500") ? true : (stryCov_9fa48("500", "501", "502"), (stryMutAct_9fa48("504") ? (account.resident || account.admin || account.technician) && account.manager : stryMutAct_9fa48("503") ? false : (stryCov_9fa48("503", "504"), (stryMutAct_9fa48("506") ? (account.resident || account.admin) && account.technician : stryMutAct_9fa48("505") ? false : (stryCov_9fa48("505", "506"), (stryMutAct_9fa48("508") ? account.resident && account.admin : stryMutAct_9fa48("507") ? false : (stryCov_9fa48("507", "508"), account.resident || account.admin)) || account.technician)) || account.manager)) || null);
    }
  }
  async findOwnerById(id: string): Promise<Admin | Manager | Technician | Resident | null> {
    if (stryMutAct_9fa48("509")) {
      {}
    } else {
      stryCov_9fa48("509");
      const account = await this.accountRepository.findOne(stryMutAct_9fa48("510") ? {} : (stryCov_9fa48("510"), {
        where: stryMutAct_9fa48("511") ? {} : (stryCov_9fa48("511"), {
          owner_id: id
        }),
        relations: stryMutAct_9fa48("512") ? {} : (stryCov_9fa48("512"), {
          admin: stryMutAct_9fa48("513") ? {} : (stryCov_9fa48("513"), {
            account: stryMutAct_9fa48("514") ? false : (stryCov_9fa48("514"), true)
          }),
          resident: stryMutAct_9fa48("515") ? {} : (stryCov_9fa48("515"), {
            account: stryMutAct_9fa48("516") ? false : (stryCov_9fa48("516"), true)
          }),
          technician: stryMutAct_9fa48("517") ? {} : (stryCov_9fa48("517"), {
            account: stryMutAct_9fa48("518") ? false : (stryCov_9fa48("518"), true)
          }),
          manager: stryMutAct_9fa48("519") ? {} : (stryCov_9fa48("519"), {
            account: stryMutAct_9fa48("520") ? false : (stryCov_9fa48("520"), true)
          })
        })
      }));
      if (stryMutAct_9fa48("523") ? account !== null : stryMutAct_9fa48("522") ? false : stryMutAct_9fa48("521") ? true : (stryCov_9fa48("521", "522", "523"), account === null)) return null;
      return stryMutAct_9fa48("526") ? (account.resident || account.admin || account.technician || account.manager) && null : stryMutAct_9fa48("525") ? false : stryMutAct_9fa48("524") ? true : (stryCov_9fa48("524", "525", "526"), (stryMutAct_9fa48("528") ? (account.resident || account.admin || account.technician) && account.manager : stryMutAct_9fa48("527") ? false : (stryCov_9fa48("527", "528"), (stryMutAct_9fa48("530") ? (account.resident || account.admin) && account.technician : stryMutAct_9fa48("529") ? false : (stryCov_9fa48("529", "530"), (stryMutAct_9fa48("532") ? account.resident && account.admin : stryMutAct_9fa48("531") ? false : (stryCov_9fa48("531", "532"), account.resident || account.admin)) || account.technician)) || account.manager)) || null);
    }
  }
}
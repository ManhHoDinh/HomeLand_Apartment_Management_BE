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
  async signIn(signInDto: SignInDto, expiresIn: string = stryMutAct_9fa48("186") ? "" : (stryCov_9fa48("186"), "30d")) {
    if (stryMutAct_9fa48("187")) {
      {}
    } else {
      stryCov_9fa48("187");
      let person = await this.findOwnerByAccountEmail(signInDto.email);
      console.log(person);
      if (stryMutAct_9fa48("190") ? (!person || !person.account) && !this.hashService.isMatch(signInDto.password, person.account.password) : stryMutAct_9fa48("189") ? false : stryMutAct_9fa48("188") ? true : (stryCov_9fa48("188", "189", "190"), (stryMutAct_9fa48("192") ? !person && !person.account : stryMutAct_9fa48("191") ? false : (stryCov_9fa48("191", "192"), (stryMutAct_9fa48("193") ? person : (stryCov_9fa48("193"), !person)) || (stryMutAct_9fa48("194") ? person.account : (stryCov_9fa48("194"), !person.account)))) || (stryMutAct_9fa48("195") ? this.hashService.isMatch(signInDto.password, person.account.password) : (stryCov_9fa48("195"), !this.hashService.isMatch(signInDto.password, person.account.password))))) {
        if (stryMutAct_9fa48("196")) {
          {}
        } else {
          stryCov_9fa48("196");
          throw new UnauthorizedException(stryMutAct_9fa48("197") ? "" : (stryCov_9fa48("197"), "Wrong email or password"));
        }
      }
      const payload: TokenPayload = stryMutAct_9fa48("198") ? {} : (stryCov_9fa48("198"), {
        id: person.id,
        role: person.role
      });
      return stryMutAct_9fa48("199") ? {} : (stryCov_9fa48("199"), {
        access_token: this.jwtService.sign(payload, stryMutAct_9fa48("200") ? {} : (stryCov_9fa48("200"), {
          expiresIn
        })),
        role: person.role
      });
    }
  }
  async findOwnerByAccountEmail(email: string): Promise<Admin | Manager | Technician | Resident | null> {
    if (stryMutAct_9fa48("201")) {
      {}
    } else {
      stryCov_9fa48("201");
      const account = await this.accountRepository.findOne(stryMutAct_9fa48("202") ? {} : (stryCov_9fa48("202"), {
        where: stryMutAct_9fa48("203") ? {} : (stryCov_9fa48("203"), {
          email
        }),
        relations: stryMutAct_9fa48("204") ? {} : (stryCov_9fa48("204"), {
          admin: stryMutAct_9fa48("205") ? {} : (stryCov_9fa48("205"), {
            account: stryMutAct_9fa48("206") ? false : (stryCov_9fa48("206"), true)
          }),
          resident: stryMutAct_9fa48("207") ? {} : (stryCov_9fa48("207"), {
            account: stryMutAct_9fa48("208") ? false : (stryCov_9fa48("208"), true)
          }),
          technician: stryMutAct_9fa48("209") ? {} : (stryCov_9fa48("209"), {
            account: stryMutAct_9fa48("210") ? false : (stryCov_9fa48("210"), true)
          }),
          manager: stryMutAct_9fa48("211") ? {} : (stryCov_9fa48("211"), {
            account: stryMutAct_9fa48("212") ? false : (stryCov_9fa48("212"), true)
          })
        })
      }));
      if (stryMutAct_9fa48("215") ? account !== null : stryMutAct_9fa48("214") ? false : stryMutAct_9fa48("213") ? true : (stryCov_9fa48("213", "214", "215"), account === null)) return null;else return stryMutAct_9fa48("218") ? (account.resident || account.admin || account.technician || account.manager) && null : stryMutAct_9fa48("217") ? false : stryMutAct_9fa48("216") ? true : (stryCov_9fa48("216", "217", "218"), (stryMutAct_9fa48("220") ? (account.resident || account.admin || account.technician) && account.manager : stryMutAct_9fa48("219") ? false : (stryCov_9fa48("219", "220"), (stryMutAct_9fa48("222") ? (account.resident || account.admin) && account.technician : stryMutAct_9fa48("221") ? false : (stryCov_9fa48("221", "222"), (stryMutAct_9fa48("224") ? account.resident && account.admin : stryMutAct_9fa48("223") ? false : (stryCov_9fa48("223", "224"), account.resident || account.admin)) || account.technician)) || account.manager)) || null);
    }
  }
  async findOwnerById(id: string): Promise<Admin | Manager | Technician | Resident | null> {
    if (stryMutAct_9fa48("225")) {
      {}
    } else {
      stryCov_9fa48("225");
      const account = await this.accountRepository.findOne(stryMutAct_9fa48("226") ? {} : (stryCov_9fa48("226"), {
        where: stryMutAct_9fa48("227") ? {} : (stryCov_9fa48("227"), {
          owner_id: id
        }),
        relations: stryMutAct_9fa48("228") ? {} : (stryCov_9fa48("228"), {
          admin: stryMutAct_9fa48("229") ? {} : (stryCov_9fa48("229"), {
            account: stryMutAct_9fa48("230") ? false : (stryCov_9fa48("230"), true)
          }),
          resident: stryMutAct_9fa48("231") ? {} : (stryCov_9fa48("231"), {
            account: stryMutAct_9fa48("232") ? false : (stryCov_9fa48("232"), true)
          }),
          technician: stryMutAct_9fa48("233") ? {} : (stryCov_9fa48("233"), {
            account: stryMutAct_9fa48("234") ? false : (stryCov_9fa48("234"), true)
          }),
          manager: stryMutAct_9fa48("235") ? {} : (stryCov_9fa48("235"), {
            account: stryMutAct_9fa48("236") ? false : (stryCov_9fa48("236"), true)
          })
        })
      }));
      if (stryMutAct_9fa48("239") ? account !== null : stryMutAct_9fa48("238") ? false : stryMutAct_9fa48("237") ? true : (stryCov_9fa48("237", "238", "239"), account === null)) return null;
      return stryMutAct_9fa48("242") ? (account.resident || account.admin || account.technician || account.manager) && null : stryMutAct_9fa48("241") ? false : stryMutAct_9fa48("240") ? true : (stryCov_9fa48("240", "241", "242"), (stryMutAct_9fa48("244") ? (account.resident || account.admin || account.technician) && account.manager : stryMutAct_9fa48("243") ? false : (stryCov_9fa48("243", "244"), (stryMutAct_9fa48("246") ? (account.resident || account.admin) && account.technician : stryMutAct_9fa48("245") ? false : (stryCov_9fa48("245", "246"), (stryMutAct_9fa48("248") ? account.resident && account.admin : stryMutAct_9fa48("247") ? false : (stryCov_9fa48("247", "248"), account.resident || account.admin)) || account.technician)) || account.manager)) || null);
    }
  }
}
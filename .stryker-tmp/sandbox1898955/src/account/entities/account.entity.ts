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
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, CreateDateColumn, DeleteDateColumn, OneToOne, BeforeUpdate, BeforeInsert } from "typeorm";
import { Resident } from "../../resident/entities/resident.entity";
import { Admin } from "../../admin/entities/admin.entity";
import { Technician } from "../../technician/entities/technician.entity";
import { Manager } from "../../manager/entities/manager.entity";
@Entity()
export class Account {
  /**
   * @description the id of the owner of this account,
   * can be: resident's id, admin's id, technician's id, manager's id
   */
  @PrimaryColumn()
  owner_id: string;
  @OneToOne(() => Resident, resident => resident.account, {
    nullable: true
  })
  resident?: Resident;
  @OneToOne(() => Admin, admin => admin.account, {
    nullable: true
  })
  admin?: Admin;
  @OneToOne(() => Technician, technician => technician.account, {
    nullable: true
  })
  technician?: Technician;
  @OneToOne(() => Manager, manager => manager.account, {
    nullable: true
  })
  manager?: Manager;
  @ApiProperty({
    required: false,
    default: "admin@gmail.com"
  })
  @IsEmail()
  @Column({
    unique: true
  })
  email: string;
  @ApiProperty({
    required: false,
    default: "password"
  })
  @IsString()
  @Exclude({
    toPlainOnly: true
  })
  @Column()
  password: string;
  @IsString()
  @Column()
  avatarURL: string;
  @CreateDateColumn()
  created_at: Date;
  @DeleteDateColumn()
  deleted_at?: Date;
  @Column({
    nullable: true
  })
  activated_at?: Date;
  @BeforeUpdate()
  @BeforeInsert()
  async checkIfAccountIsHasMultipleOwner() {
    if (stryMutAct_9fa48("12")) {
      {}
    } else {
      stryCov_9fa48("12");
      let owners: any[] = stryMutAct_9fa48("13") ? ["Stryker was here"] : (stryCov_9fa48("13"), []);
      if (stryMutAct_9fa48("15") ? false : stryMutAct_9fa48("14") ? true : (stryCov_9fa48("14", "15"), this.resident)) owners.push(this.resident);
      if (stryMutAct_9fa48("17") ? false : stryMutAct_9fa48("16") ? true : (stryCov_9fa48("16", "17"), this.admin)) owners.push(this.admin);
      if (stryMutAct_9fa48("19") ? false : stryMutAct_9fa48("18") ? true : (stryCov_9fa48("18", "19"), this.technician)) owners.push(this.technician);
      if (stryMutAct_9fa48("21") ? false : stryMutAct_9fa48("20") ? true : (stryCov_9fa48("20", "21"), this.manager)) owners.push(this.manager);
      if (stryMutAct_9fa48("24") ? owners.length == 1 : stryMutAct_9fa48("23") ? false : stryMutAct_9fa48("22") ? true : (stryCov_9fa48("22", "23", "24"), owners.length != 1)) {
        if (stryMutAct_9fa48("25")) {
          {}
        } else {
          stryCov_9fa48("25");
          throw new Error(stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), "Account must have only one owner"));
        }
      }
    }
  }
}
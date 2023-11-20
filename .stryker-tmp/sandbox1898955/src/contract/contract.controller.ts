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
import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Query, UseGuards, UploadedFile, ParseFilePipe, NotFoundException } from "@nestjs/common";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { Auth } from "../helper/decorator/auth.decorator";
import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FormDataRequest } from "nestjs-form-data";
import { PersonRole } from "../helper/class/profile.entity";
@ApiTags("Contract")
@Auth(PersonRole.ADMIN)
@Controller("contract")
export class ContractController {
  constructor(private readonly contractService: ContractService) {}
  @Post()
  @ApiConsumes("multipart/form-data")
  @FormDataRequest()
  create(@Body()
  createContractDto: CreateContractDto) {
    if (stryMutAct_9fa48("321")) {
      {}
    } else {
      stryCov_9fa48("321");
      return this.contractService.create(createContractDto);
    }
  }
  @ApiQuery({
    name: "page",
    required: false,
    description: "Page number: Page indexed from 1, each page contain 30 items, if null then return all."
  })
  @Get()
  async findAll(@Query("page")
  page?: number) {
    if (stryMutAct_9fa48("322")) {
      {}
    } else {
      stryCov_9fa48("322");
      var data;
      if (stryMutAct_9fa48("324") ? false : stryMutAct_9fa48("323") ? true : (stryCov_9fa48("323", "324"), Number.isNaN(page))) data = await this.contractService.findAll();else data = await this.contractService.findAll(page);
      return stryMutAct_9fa48("325") ? {} : (stryCov_9fa48("325"), {
        data,
        current_page: page,
        per_page: 30,
        total: data.length
      });
    }
  }
  @Get(":id")
  findOne(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("326")) {
      {}
    } else {
      stryCov_9fa48("326");
      return this.contractService.findOne(id);
    }
  }
  @Patch(":id")
  @ApiConsumes("multipart/form-data")
  @FormDataRequest()
  async update(@Param("id")
  id: string, @Body()
  updateContractDto: UpdateContractDto) {
    if (stryMutAct_9fa48("327")) {
      {}
    } else {
      stryCov_9fa48("327");
      const result = await this.contractService.update(id, updateContractDto);
      if (stryMutAct_9fa48("329") ? false : stryMutAct_9fa48("328") ? true : (stryCov_9fa48("328", "329"), result)) return stryMutAct_9fa48("330") ? [] : (stryCov_9fa48("330"), [stryMutAct_9fa48("331") ? {} : (stryCov_9fa48("331"), {
        msg: stryMutAct_9fa48("332") ? "" : (stryCov_9fa48("332"), "Contract updated")
      }), await this.findOne(id)]);
      throw new NotFoundException(stryMutAct_9fa48("333") ? "" : (stryCov_9fa48("333"), "Contract not found"));
    }
  }
  @Delete(":id")
  remove(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("334")) {
      {}
    } else {
      stryCov_9fa48("334");
      return this.contractService.remove(id);
    }
  }
}
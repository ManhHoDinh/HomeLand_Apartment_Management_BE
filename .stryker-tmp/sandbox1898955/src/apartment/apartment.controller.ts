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
import { Controller, Get, Body, Param, NotFoundException, Query, Post, Patch } from "@nestjs/common";
import { ApartmentService } from "./apartment.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
// import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FormDataRequest } from "nestjs-form-data";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
@ApiTags("Apartment")
@Controller("apartment")
export class ApartmentController {
  constructor(private readonly apartmentRepository: ApartmentService) {}
  @Post()
  @ApiConsumes("multipart/form-data")
  @FormDataRequest()
  create(@Body()
  createApartmentDto: CreateApartmentDto) {
    if (stryMutAct_9fa48("38")) {
      {}
    } else {
      stryCov_9fa48("38");
      return this.apartmentRepository.create(createApartmentDto);
    }
  }
  @ApiQuery({
    name: "page",
    required: false,
    description: "Page number: Page indexed from 1, each page contain 30 items, if null then return all."
  })
  @Get()
  findAll(@Query("page")
  page: number) {
    if (stryMutAct_9fa48("39")) {
      {}
    } else {
      stryCov_9fa48("39");
      if (stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41"), Number.isNaN(page))) return this.apartmentRepository.findAll();else return this.apartmentRepository.findAll(page);
    }
  }
  @Get(":id")
  async findOne(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("42")) {
      {}
    } else {
      stryCov_9fa48("42");
      const apartment = await this.apartmentRepository.findOne(id);
      if (stryMutAct_9fa48("44") ? false : stryMutAct_9fa48("43") ? true : (stryCov_9fa48("43", "44"), apartment)) return apartment;
      throw new NotFoundException(stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "Apartment not found"));
    }
  }

  /**
   *
   * @param id apartment id
   * @param updateApartmentDto
   * @returns
   */
  @ApiConsumes("multipart/form-data")
  @Patch(":id")
  @FormDataRequest()
  async update(@Param("id")
  id: string, @Body()
  updateApartmentDto: UpdateApartmentDto) {
    if (stryMutAct_9fa48("46")) {
      {}
    } else {
      stryCov_9fa48("46");
      if (stryMutAct_9fa48("48") ? false : stryMutAct_9fa48("47") ? true : (stryCov_9fa48("47", "48"), await this.apartmentRepository.update(id, updateApartmentDto))) {
        if (stryMutAct_9fa48("49")) {
          {}
        } else {
          stryCov_9fa48("49");
          return await this.findOne(id);
        }
      }
    }
  }
}
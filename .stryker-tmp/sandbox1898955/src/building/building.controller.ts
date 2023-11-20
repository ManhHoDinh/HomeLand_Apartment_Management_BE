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
import { Repository } from "typeorm";
import { Controller, Get, Post, Body, Patch, Param, NotFoundException, Query, Delete } from "@nestjs/common";
import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FormDataRequest } from "nestjs-form-data";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { BuildingService, TypeORMBuildingService } from "./building.service";
import { id_ID } from "@faker-js/faker";
@ApiTags("Building")
@Controller("building")
export class BuildingController {
  constructor(private readonly buildingRepository: TypeORMBuildingService) {}
  @ApiConsumes("multipart/form-data")
  @Post()
  @FormDataRequest()
  create(@Body()
  createBuildingDto: CreateBuildingDto) {
    if (stryMutAct_9fa48("279")) {
      {}
    } else {
      stryCov_9fa48("279");
      return this.buildingRepository.create(createBuildingDto);
    }
  }
  // search building
  /**
   * search building by name
   * @param query string that admin search by name
   */
  @Get("search")
  async searchBuilding(@Query("query")
  query: string) {
    if (stryMutAct_9fa48("280")) {
      {}
    } else {
      stryCov_9fa48("280");
      const result = await this.buildingRepository.search(query);
      return result;
    }
  }
  @ApiQuery({
    name: "page",
    required: false,
    description: "Page number: Page indexed from 1, each page contain 30 items, if null then return all."
  })
  @Get()
  findAll() {
    if (stryMutAct_9fa48("281")) {
      {}
    } else {
      stryCov_9fa48("281");
      return this.buildingRepository.findAll();
    }
  }
  @Get(":id")
  async findOne(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("282")) {
      {}
    } else {
      stryCov_9fa48("282");
      try {
        if (stryMutAct_9fa48("283")) {
          {}
        } else {
          stryCov_9fa48("283");
          const building = await this.buildingRepository.findOne(id);
          if (stryMutAct_9fa48("285") ? false : stryMutAct_9fa48("284") ? true : (stryCov_9fa48("284", "285"), building)) return building;
        }
      } catch (e) {
        if (stryMutAct_9fa48("286")) {
          {}
        } else {
          stryCov_9fa48("286");
          throw new Error(stryMutAct_9fa48("287") ? "" : (stryCov_9fa48("287"), "Building not found"));
        }
      }
    }
  }
  @Patch(":id")
  async update(@Param("id")
  id: string, @Body()
  updateBuildingDto: UpdateBuildingDto) {
    if (stryMutAct_9fa48("288")) {
      {}
    } else {
      stryCov_9fa48("288");
      try {
        if (stryMutAct_9fa48("289")) {
          {}
        } else {
          stryCov_9fa48("289");
          const result = await this.buildingRepository.update(id, updateBuildingDto);
          return result;
        }
      } catch (e) {
        if (stryMutAct_9fa48("290")) {
          {}
        } else {
          stryCov_9fa48("290");
          throw new Error(stryMutAct_9fa48("291") ? "" : (stryCov_9fa48("291"), "Building not found"));
        }
      }
    }
  }
  @Delete("/:id")
  async softDeleteBuilding(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("292")) {
      {}
    } else {
      stryCov_9fa48("292");
      try {
        if (stryMutAct_9fa48("293")) {
          {}
        } else {
          stryCov_9fa48("293");
          const result = await this.buildingRepository.delete(id);
          return result;
        }
      } catch (error) {
        if (stryMutAct_9fa48("294")) {
          {}
        } else {
          stryCov_9fa48("294");
          throw new Error(stryMutAct_9fa48("295") ? "" : (stryCov_9fa48("295"), "Building not found to delete"));
        }
      }
    }
  }
}
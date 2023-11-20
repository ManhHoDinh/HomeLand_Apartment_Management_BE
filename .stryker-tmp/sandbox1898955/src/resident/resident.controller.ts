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
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Req, Put, Query, ParseEnumPipe } from "@nestjs/common";
import { ResidentRepository, ResidentService } from "./resident.service";
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { FormDataRequest } from "nestjs-form-data";
import { PersonRole } from "../helper/class/profile.entity";
import { JWTAuthGuard } from "../auth/guard/jwt-auth.guard";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { Resident } from "./entities/resident.entity";
import { UpdateResidentDto } from "./dto/update-resident.dto";
@ApiTags("Resident")
// @UseGuards(JWTAuthGuard)
// @ApiBearerAuth()
@Controller("resident")
export class ResidentController {
  constructor(private readonly residentRepository: ResidentService) {}

  // /**
  //  * @deprecated
  //  * Create person profile, only token from admin or manager can access this API
  //  * - Admin can create manager, resident and techinician
  //  * - Manager can create resident and technician
  //  *
  //  * Other role can not create person profile */
  @ApiOperation({
    summary: "Create resident profile"
  })
  @ApiConsumes("multipart/form-data")
  @ApiUnprocessableEntityResponse({
    description: "Email or phone number already exists"
  })
  @ApiCreatedResponse({
    description: "Create person profile successfully"
  })
  @Post()
  @FormDataRequest()
  async create(@Body()
  createResidentDto: CreateResidentDto) {
    if (stryMutAct_9fa48("601")) {
      {}
    } else {
      stryCov_9fa48("601");
      return await this.residentRepository.create(createResidentDto);
    }
  }
  @Get("/search")
  async searchResident(@Query("query")
  query: string) {
    if (stryMutAct_9fa48("602")) {
      {}
    } else {
      stryCov_9fa48("602");
      const result = await this.residentRepository.search(query);
      return result;
    }
  }
  @Delete("/:id")
  async softDeleteResident(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("603")) {
      {}
    } else {
      stryCov_9fa48("603");
      try {
        if (stryMutAct_9fa48("604")) {
          {}
        } else {
          stryCov_9fa48("604");
          const result = await this.residentRepository.delete(id);
          return result;
        }
      } catch (error) {
        if (stryMutAct_9fa48("605")) {
          {}
        } else {
          stryCov_9fa48("605");
          throw new Error(stryMutAct_9fa48("606") ? "" : (stryCov_9fa48("606"), "Resident not found to delete"));
        }
      }
    }
  }
  /**
   *
   * Create account, only token from admin or manager can access this API
   *
   * Account must associate with person profile
   */
  @ApiOperation({
    summary: "update resident"
  })
  @Patch("/:id")
  async updateResident(@Param("id")
  id: string, @Body()
  updateResidentDto: UpdateResidentDto): Promise<Resident> {
    if (stryMutAct_9fa48("607")) {
      {}
    } else {
      stryCov_9fa48("607");
      try {
        if (stryMutAct_9fa48("608")) {
          {}
        } else {
          stryCov_9fa48("608");
          const resident = await this.residentRepository.updateResident(id, updateResidentDto);
          return resident;
        }
      } catch (e) {
        if (stryMutAct_9fa48("609")) {
          {}
        } else {
          stryCov_9fa48("609");
          throw new Error(stryMutAct_9fa48("610") ? "" : (stryCov_9fa48("610"), "Resident not found"));
        }
      }
    }
  }
  @ApiOperation({
    summary: "get all resident"
  })
  @Get()
  async findAll(): Promise<Resident[]> {
    if (stryMutAct_9fa48("611")) {
      {}
    } else {
      stryCov_9fa48("611");
      return this.residentRepository.findAll();
    }
  }
  @ApiOperation({
    summary: "get resident by id"
  })
  @Get("/:id")
  async findOne(@Param("id")
  id: string): Promise<Resident | null> {
    if (stryMutAct_9fa48("612")) {
      {}
    } else {
      stryCov_9fa48("612");
      try {
        if (stryMutAct_9fa48("613")) {
          {}
        } else {
          stryCov_9fa48("613");
          const resident = await this.residentRepository.findOne(id);
          return resident;
        }
      } catch (e) {
        if (stryMutAct_9fa48("614")) {
          {}
        } else {
          stryCov_9fa48("614");
          throw new Error(stryMutAct_9fa48("615") ? "" : (stryCov_9fa48("615"), "Resident not found"));
        }
      }
    }
  }
}
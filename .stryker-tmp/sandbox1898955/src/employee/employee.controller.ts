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
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Query, ParseEnumPipe, Delete, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { Employee } from "./entities/employee.entity";
import { Auth } from "../helper/decorator/auth.decorator";
import { FormDataRequest } from "nestjs-form-data";
import { PersonRole } from "../helper/class/profile.entity";
import { JWTAuthGuard } from "../auth/guard/jwt-auth.guard";
import { EmployeeRepository, EmployeeService } from "./employee.service";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { IsOptional } from "class-validator";
import { EmojiType } from "node_modules/@faker-js/faker/dist/types/modules/internet";
@ApiTags("Employee")
// @UseGuards(JWTAuthGuard)
// @ApiBearerAuth()
@Auth(PersonRole.ADMIN, PersonRole.MANAGER)
@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  @ApiOperation({
    summary: "Create person profile"
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
  createPersonDto: CreateEmployeeDto) {
    if (stryMutAct_9fa48("403")) {
      {}
    } else {
      stryCov_9fa48("403");
      return await this.employeeRepository.create(createPersonDto);
    }
  }
  @Get(":id")
  findOne(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("404")) {
      {}
    } else {
      stryCov_9fa48("404");
      return this.employeeRepository.findOne(id);
    }
  }
  @ApiOperation({
    summary: "update employee"
  })
  @Patch(":id")
  @ApiConsumes("multipart/form-data")
  @FormDataRequest()
  async updateEmployee(@Param("id")
  id: string, @Body()
  updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    if (stryMutAct_9fa48("405")) {
      {}
    } else {
      stryCov_9fa48("405");
      const employee = await this.employeeRepository.updateEmployee(id, updateEmployeeDto);
      return employee;
    }
  }
  // findAll() {
  //         //         @Query("role", new ParseEnumPipe(PersonRole, { optional: true }))
  //         //         role?: PersonRole,
  //         // ): Promise<Employee[]> {
  //         //         if (role) return this.employeeRepository.find All(role);
  //         return this.employeeRepository.findAll();
  // }
  @ApiOperation({
    summary: "get all employee"
  })
  @Get()
  async findAll(): Promise<Employee[]> {
    if (stryMutAct_9fa48("406")) {
      {}
    } else {
      stryCov_9fa48("406");
      return this.employeeRepository.findAll();
    }
  }
  @Delete(":id")
  remove(@Param("id")
  id: string) {
    if (stryMutAct_9fa48("407")) {
      {}
    } else {
      stryCov_9fa48("407");
      return this.employeeRepository.delete(id);
    }
  }
}
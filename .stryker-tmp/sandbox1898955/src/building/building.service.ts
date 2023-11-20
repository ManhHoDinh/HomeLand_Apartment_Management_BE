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
import { IdGenerator } from "../id-generator/id-generator.service";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, In, Repository, Like } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StorageManager } from "../storage/storage.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { Building } from "./entities/building.entity";
import { Floor } from "../floor/entities/floor.entity";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { isQueryAffected } from "../helper/validation";
import { th } from "@faker-js/faker";
import { Apartment } from "../apartment/entities/apartment.entity";
export abstract class BuildingService implements IRepository<Building> {
  abstract findOne(id: string): Promise<Building | null>;
  abstract update(id: string, updateEntityDto: any);
  abstract delete(id: string);
  abstract create(createBuildingDto: CreateBuildingDto, id?: string): Promise<Building>;
  abstract findAll(page?: number): Promise<Building[]>;
  abstract search(query: string): Promise<Building[]>;
}
@Injectable()
export class TypeORMBuildingService extends BuildingService {
  constructor(@InjectRepository(Building)
  private readonly buildingRepository: Repository<Building>, @InjectRepository(Floor)
  private readonly floorRepository: Repository<Floor>, @InjectRepository(Apartment)
  private readonly apartmentRepository: Repository<Apartment>, private readonly idGenerate: IdGenerator) {
    super();
  }
  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    if (stryMutAct_9fa48("296")) {
      {}
    } else {
      stryCov_9fa48("296");
      let building = this.buildingRepository.create(createBuildingDto);
      building.building_id = (stryMutAct_9fa48("297") ? "" : (stryCov_9fa48("297"), "BD")) + this.idGenerate.generateId();
      console.log(building);
      try {
        if (stryMutAct_9fa48("298")) {
          {}
        } else {
          stryCov_9fa48("298");
          return await this.buildingRepository.save(building);
        }
      } catch (error) {
        if (stryMutAct_9fa48("299")) {
          {}
        } else {
          stryCov_9fa48("299");
          throw new BadRequestException(stryMutAct_9fa48("300") ? "" : (stryCov_9fa48("300"), "Create fail"));
        }
      }
    }
  }
  async findAll() {
    if (stryMutAct_9fa48("301")) {
      {}
    } else {
      stryCov_9fa48("301");
      const allBuilding = await this.buildingRepository.find({});
      return allBuilding;
    }
  }
  async findOne(id: string) {
    if (stryMutAct_9fa48("302")) {
      {}
    } else {
      stryCov_9fa48("302");
      try {
        if (stryMutAct_9fa48("303")) {
          {}
        } else {
          stryCov_9fa48("303");
          const building = await this.buildingRepository.findOne(stryMutAct_9fa48("304") ? {} : (stryCov_9fa48("304"), {
            where: stryMutAct_9fa48("305") ? {} : (stryCov_9fa48("305"), {
              building_id: id
            })
          }));
          return building;
        }
      } catch (e) {
        if (stryMutAct_9fa48("306")) {
          {}
        } else {
          stryCov_9fa48("306");
          throw new NotFoundException(stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), "Not found building"));
        }
      }
    }
  }
  async update(id: string, updateBuildingDto: UpdateBuildingDto) {
    if (stryMutAct_9fa48("308")) {
      {}
    } else {
      stryCov_9fa48("308");
      try {
        if (stryMutAct_9fa48("309")) {
          {}
        } else {
          stryCov_9fa48("309");
          let result = await this.buildingRepository.update(id, updateBuildingDto);
          return result;
        }
      } catch (error) {
        if (stryMutAct_9fa48("310")) {
          {}
        } else {
          stryCov_9fa48("310");
          throw new BadRequestException(stryMutAct_9fa48("311") ? "" : (stryCov_9fa48("311"), "Id not found."));
        }
      }
    }
  }
  async delete(id: string) {
    if (stryMutAct_9fa48("312")) {
      {}
    } else {
      stryCov_9fa48("312");
      try {
        if (stryMutAct_9fa48("313")) {
          {}
        } else {
          stryCov_9fa48("313");
          const result = await this.buildingRepository.softDelete(stryMutAct_9fa48("314") ? {} : (stryCov_9fa48("314"), {
            building_id: id
          }));
          return result;
        }
      } catch (error) {
        if (stryMutAct_9fa48("315")) {
          {}
        } else {
          stryCov_9fa48("315");
          throw new Error(stryMutAct_9fa48("316") ? "" : (stryCov_9fa48("316"), "can not delete"));
        }
      }
    }
  }
  /**
   *
   * @param query chuỗi cần tìm theo tên
   * @returns
   */
  async search(query: string): Promise<Building[]> {
    if (stryMutAct_9fa48("317")) {
      {}
    } else {
      stryCov_9fa48("317");
      const result = await this.buildingRepository.find(stryMutAct_9fa48("318") ? {} : (stryCov_9fa48("318"), {
        where: stryMutAct_9fa48("319") ? {} : (stryCov_9fa48("319"), {
          name: Like(stryMutAct_9fa48("320") ? `` : (stryCov_9fa48("320"), `%${query}%`))
        })
      }));
      return result;
    }
  }
}
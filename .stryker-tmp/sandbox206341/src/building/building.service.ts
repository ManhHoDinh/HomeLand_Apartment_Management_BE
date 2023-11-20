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
    if (stryMutAct_9fa48("747")) {
      {}
    } else {
      stryCov_9fa48("747");
      let building = this.buildingRepository.create(createBuildingDto);
      building.building_id = (stryMutAct_9fa48("748") ? "" : (stryCov_9fa48("748"), "BD")) + this.idGenerate.generateId();
      console.log(building);
      try {
        if (stryMutAct_9fa48("749")) {
          {}
        } else {
          stryCov_9fa48("749");
          return await this.buildingRepository.save(building);
        }
      } catch (error) {
        if (stryMutAct_9fa48("750")) {
          {}
        } else {
          stryCov_9fa48("750");
          throw new BadRequestException(stryMutAct_9fa48("751") ? "" : (stryCov_9fa48("751"), "Create fail"));
        }
      }
    }
  }
  async findAll() {
    if (stryMutAct_9fa48("752")) {
      {}
    } else {
      stryCov_9fa48("752");
      const allBuilding = await this.buildingRepository.find({});
      return allBuilding;
    }
  }
  async findOne(id: string) {
    if (stryMutAct_9fa48("753")) {
      {}
    } else {
      stryCov_9fa48("753");
      try {
        if (stryMutAct_9fa48("754")) {
          {}
        } else {
          stryCov_9fa48("754");
          const building = await this.buildingRepository.findOne(stryMutAct_9fa48("755") ? {} : (stryCov_9fa48("755"), {
            where: stryMutAct_9fa48("756") ? {} : (stryCov_9fa48("756"), {
              building_id: id
            })
          }));
          return building;
        }
      } catch (e) {
        if (stryMutAct_9fa48("757")) {
          {}
        } else {
          stryCov_9fa48("757");
          throw new NotFoundException(stryMutAct_9fa48("758") ? "" : (stryCov_9fa48("758"), "Not found building"));
        }
      }
    }
  }
  async update(id: string, updateBuildingDto: UpdateBuildingDto) {
    if (stryMutAct_9fa48("759")) {
      {}
    } else {
      stryCov_9fa48("759");
      try {
        if (stryMutAct_9fa48("760")) {
          {}
        } else {
          stryCov_9fa48("760");
          let result = await this.buildingRepository.update(id, updateBuildingDto);
          return result;
        }
      } catch (error) {
        if (stryMutAct_9fa48("761")) {
          {}
        } else {
          stryCov_9fa48("761");
          throw new BadRequestException(stryMutAct_9fa48("762") ? "" : (stryCov_9fa48("762"), "Id not found."));
        }
      }
    }
  }
  async delete(id: string) {
    if (stryMutAct_9fa48("763")) {
      {}
    } else {
      stryCov_9fa48("763");
      try {
        if (stryMutAct_9fa48("764")) {
          {}
        } else {
          stryCov_9fa48("764");
          const result = await this.buildingRepository.softDelete(stryMutAct_9fa48("765") ? {} : (stryCov_9fa48("765"), {
            building_id: id
          }));
          return result;
        }
      } catch (error) {
        if (stryMutAct_9fa48("766")) {
          {}
        } else {
          stryCov_9fa48("766");
          throw new Error(stryMutAct_9fa48("767") ? "" : (stryCov_9fa48("767"), "can not delete"));
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
    if (stryMutAct_9fa48("768")) {
      {}
    } else {
      stryCov_9fa48("768");
      const result = await this.buildingRepository.find(stryMutAct_9fa48("769") ? {} : (stryCov_9fa48("769"), {
        where: stryMutAct_9fa48("770") ? {} : (stryCov_9fa48("770"), {
          name: Like(stryMutAct_9fa48("771") ? `` : (stryCov_9fa48("771"), `%${query}%`))
        })
      }));
      return result;
    }
  }
}
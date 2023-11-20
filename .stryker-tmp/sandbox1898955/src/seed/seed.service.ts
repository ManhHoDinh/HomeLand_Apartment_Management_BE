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
import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Floor } from "../floor/entities/floor.entity";
import { Building } from "../building/entities/building.entity";
import { StorageManager } from "../storage/storage.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { MemoryStoredFile } from "nestjs-form-data";
import { Admin } from "../admin/entities/admin.entity";
import { IdGenerator } from "../id-generator/id-generator.service";
import { HashService } from "../hash/hash.service";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { ApartmentService } from "../apartment/apartment.service";
import { Resident } from "../resident/entities/resident.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
import { ResidentRepository, ResidentService } from "../resident/resident.service";
import { Employee } from "src/employee/entities/employee.entity";
import { EmployeeRepository, EmployeeService } from "src/employee/employee.service";
import { random } from "lodash";
import { Contract } from "src/contract/entities/contract.entity";
@Injectable()
export class SeedService {
  constructor(@InjectDataSource()
  private readonly dataSource: DataSource, private readonly storageManager: StorageManager, private readonly idGenerator: IdGenerator, private readonly hashService: HashService, private readonly avatarGenerator: AvatarGenerator, private readonly apartmentService: ApartmentService, private readonly residentService: ResidentService) {}
  async dropDB() {
    if (stryMutAct_9fa48("725")) {
      {}
    } else {
      stryCov_9fa48("725");
      try {
        if (stryMutAct_9fa48("726")) {
          {}
        } else {
          stryCov_9fa48("726");
          await this.storageManager.destroyStorage();
          await this.dataSource.dropDatabase();
        }
      } catch (error) {
        if (stryMutAct_9fa48("727")) {
          {}
        } else {
          stryCov_9fa48("727");
          throw new Error(stryMutAct_9fa48("728") ? "" : (stryCov_9fa48("728"), "error"));
        }
      }
    }
  }
  async createDB() {
    if (stryMutAct_9fa48("729")) {
      {}
    } else {
      stryCov_9fa48("729");
      try {
        if (stryMutAct_9fa48("730")) {
          {}
        } else {
          stryCov_9fa48("730");
          await this.storageManager.initiateStorage();
          await this.dataSource.synchronize();
        }
      } catch (error) {
        if (stryMutAct_9fa48("731")) {
          {}
        } else {
          stryCov_9fa48("731");
          throw new Error(stryMutAct_9fa48("732") ? "" : (stryCov_9fa48("732"), "error"));
        }
      }
    }
  }
  private readonly NUMBER_OF_BUILDING = 5;
  private readonly NUMBER_OF_FLOOR_PER_BUILDING = 5;
  private readonly NUMBER_OF_APARTMENT_PER_FLOOR = 6;
  private readonly NUMBER_OF_RESIDENT = 50;
  private readonly NUMBER_OF_EMPLOYEE = 10;
  private readonly NUMBER_OF_MANAGER = 10;
  private readonly NUMBER_OF_TECHNICIAN = 10;
  private readonly NUMBER_OF_ADMIN = 2;
  private readonly frontIdentity = ({
    buffer: readFileSync(process.cwd() + "/src/seed/front.jpg")
  } as MemoryStoredFile);
  private readonly backIdentity = ({
    buffer: readFileSync(process.cwd() + "/src/seed/back.jpg")
  } as MemoryStoredFile);
  private readonly images = stryMutAct_9fa48("733") ? [] : (stryCov_9fa48("733"), [({
    buffer: readFileSync(process.cwd() + "/src/seed/room.jpg")
  } as MemoryStoredFile), ({
    buffer: readFileSync(process.cwd() + "/src/seed/room (2).jpg")
  } as MemoryStoredFile), ({
    buffer: readFileSync(process.cwd() + "/src/seed/room (3).jpg")
  } as MemoryStoredFile), ({
    buffer: readFileSync(process.cwd() + "/src/seed/room (4).jpg")
  } as MemoryStoredFile), ({
    buffer: readFileSync(process.cwd() + "/src/seed/room (5).jpg")
  } as MemoryStoredFile)]);
  async startSeeding() {}
  async createDemoApartments(floorInfo: any[]) {
    if (stryMutAct_9fa48("734")) {
      {}
    } else {
      stryCov_9fa48("734");
      let apartmentIds: any[] = stryMutAct_9fa48("735") ? ["Stryker was here"] : (stryCov_9fa48("735"), []);
      for (let floor of floorInfo) {
        if (stryMutAct_9fa48("736")) {
          {}
        } else {
          stryCov_9fa48("736");
          for (let i = 0; stryMutAct_9fa48("739") ? i >= this.NUMBER_OF_APARTMENT_PER_FLOOR : stryMutAct_9fa48("738") ? i <= this.NUMBER_OF_APARTMENT_PER_FLOOR : stryMutAct_9fa48("737") ? false : (stryCov_9fa48("737", "738", "739"), i < this.NUMBER_OF_APARTMENT_PER_FLOOR); stryMutAct_9fa48("740") ? i-- : (stryCov_9fa48("740"), i++)) {
            if (stryMutAct_9fa48("741")) {
              {}
            } else {
              stryCov_9fa48("741");
              apartmentIds.push((await this.apartmentService.create(stryMutAct_9fa48("742") ? {} : (stryCov_9fa48("742"), {
                name: stryMutAct_9fa48("743") ? "" : (stryCov_9fa48("743"), "St. Crytal"),
                images: this.images,
                length: 20,
                building_id: floor.building_id,
                floor_id: floor.floor_id,
                width: 15,
                description: faker.lorem.paragraphs(stryMutAct_9fa48("744") ? {} : (stryCov_9fa48("744"), {
                  min: 3,
                  max: 5
                })),
                number_of_bathroom: 2,
                number_of_bedroom: 1,
                rent: 9000000
              }))).apartment_id);
            }
          }
        }
      }
    }
  }
}
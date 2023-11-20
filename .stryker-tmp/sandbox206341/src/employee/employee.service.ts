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
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TypeORMError, DataSource } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { hashSync } from "bcrypt";
import { StorageManager } from "../storage/storage.service";
import { isQueryAffected } from "../helper/validation";
import { HashService } from "../hash/hash.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { MemoryStoredFile } from "nestjs-form-data";
import { PersonRole, Profile } from "../helper/class/profile.entity";
import { IdGenerator } from "../id-generator/id-generator.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { profile } from "console";
export abstract class EmployeeRepository implements IRepository<Employee> {
  abstract findOne(id: string): Promise<Employee | null>;
  abstract update(id: string, updateEntityDto: any): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  // abstract findOneByEmail(email: string): Promise<Employee | null>;
  abstract create(createEmployeeDto: CreateEmployeeDto, id?: string): Promise<Employee>;
  abstract updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
  abstract findAll(): Promise<Employee[]>;
}
@Injectable()
export class EmployeeService implements EmployeeRepository {
  constructor(@InjectRepository(Employee)
  private readonly employeeRepository: Repository<Employee>, private readonly storageManager: StorageManager, private readonly hashService: HashService, private readonly avatarGenerator: AvatarGenerator, private readonly idGenerate: IdGenerator, private dataSource: DataSource) {}

  /**
   * Create a person and insert into database
   * @param createEmployeeDto JSON object to create person
   * @param creatorRole role of who evoke this function
   * @default creatorRole undefined
   * @param id set the id of person, if not set, id will be generated
   * @default id undefined
   * @returns inserted person
   */
  async create(createEmployeeDto: CreateEmployeeDto, id?: string): Promise<Employee> {
    if (stryMutAct_9fa48("1254")) {
      {}
    } else {
      stryCov_9fa48("1254");
      const {
        front_identify_card_photo,
        back_identify_card_photo,
        profile_picture,
        ...rest
      } = createEmployeeDto;
      const profile = plainToInstance(Profile, rest);
      // let employee = this.employeeRepository.create(rest);
      let employee = new Employee();
      if (stryMutAct_9fa48("1256") ? false : stryMutAct_9fa48("1255") ? true : (stryCov_9fa48("1255", "1256"), id)) employee.id = id;else employee.id = (stryMutAct_9fa48("1257") ? "" : (stryCov_9fa48("1257"), "EMP")) + this.idGenerate.generateId();
      try {
        if (stryMutAct_9fa48("1258")) {
          {}
        } else {
          stryCov_9fa48("1258");
          const frontPhoto = (front_identify_card_photo as MemoryStoredFile);
          const backPhoto = (front_identify_card_photo as MemoryStoredFile);
          const frontURL = await this.storageManager.upload(frontPhoto.buffer, (stryMutAct_9fa48("1259") ? "" : (stryCov_9fa48("1259"), "employee/")) + employee.id + (stryMutAct_9fa48("1260") ? "" : (stryCov_9fa48("1260"), "/front_identify_card_photo_URL.")) + (stryMutAct_9fa48("1263") ? frontPhoto.extension && "png" : stryMutAct_9fa48("1262") ? false : stryMutAct_9fa48("1261") ? true : (stryCov_9fa48("1261", "1262", "1263"), frontPhoto.extension || (stryMutAct_9fa48("1264") ? "" : (stryCov_9fa48("1264"), "png")))), stryMutAct_9fa48("1267") ? frontPhoto.mimetype && "image/png" : stryMutAct_9fa48("1266") ? false : stryMutAct_9fa48("1265") ? true : (stryCov_9fa48("1265", "1266", "1267"), frontPhoto.mimetype || (stryMutAct_9fa48("1268") ? "" : (stryCov_9fa48("1268"), "image/png"))));
          const backURL = await this.storageManager.upload(back_identify_card_photo.buffer, (stryMutAct_9fa48("1269") ? "" : (stryCov_9fa48("1269"), "employee/")) + employee.id + (stryMutAct_9fa48("1270") ? "" : (stryCov_9fa48("1270"), "/back_identify_card_photo_URL.")) + (stryMutAct_9fa48("1273") ? backPhoto.extension && "png" : stryMutAct_9fa48("1272") ? false : stryMutAct_9fa48("1271") ? true : (stryCov_9fa48("1271", "1272", "1273"), backPhoto.extension || (stryMutAct_9fa48("1274") ? "" : (stryCov_9fa48("1274"), "png")))), stryMutAct_9fa48("1277") ? backPhoto.mimetype && "image/png" : stryMutAct_9fa48("1276") ? false : stryMutAct_9fa48("1275") ? true : (stryCov_9fa48("1275", "1276", "1277"), backPhoto.mimetype || (stryMutAct_9fa48("1278") ? "" : (stryCov_9fa48("1278"), "image/png"))));
          let profilePictureURL: string | undefined = undefined;
          const avatarPhoto = createEmployeeDto.profile_picture;
          if (stryMutAct_9fa48("1280") ? false : stryMutAct_9fa48("1279") ? true : (stryCov_9fa48("1279", "1280"), avatarPhoto)) {
            if (stryMutAct_9fa48("1281")) {
              {}
            } else {
              stryCov_9fa48("1281");
              profilePictureURL = await this.storageManager.upload(avatarPhoto.buffer, (stryMutAct_9fa48("1282") ? "" : (stryCov_9fa48("1282"), "employee/")) + employee.id + (stryMutAct_9fa48("1283") ? "" : (stryCov_9fa48("1283"), "/avatarURL.")) + (stryMutAct_9fa48("1286") ? avatarPhoto.extension && "png" : stryMutAct_9fa48("1285") ? false : stryMutAct_9fa48("1284") ? true : (stryCov_9fa48("1284", "1285", "1286"), avatarPhoto.extension || (stryMutAct_9fa48("1287") ? "" : (stryCov_9fa48("1287"), "png")))), stryMutAct_9fa48("1290") ? avatarPhoto.mimetype && "image/png" : stryMutAct_9fa48("1289") ? false : stryMutAct_9fa48("1288") ? true : (stryCov_9fa48("1288", "1289", "1290"), avatarPhoto.mimetype || (stryMutAct_9fa48("1291") ? "" : (stryCov_9fa48("1291"), "image/png"))));
            }
          } else {
            if (stryMutAct_9fa48("1292")) {
              {}
            } else {
              stryCov_9fa48("1292");
              const avatar = await this.avatarGenerator.generateAvatar(profile.name);
              profilePictureURL = await this.storageManager.upload(avatar, (stryMutAct_9fa48("1293") ? "" : (stryCov_9fa48("1293"), "employee/")) + employee.id + (stryMutAct_9fa48("1294") ? "" : (stryCov_9fa48("1294"), "/avatarURL.svg")), stryMutAct_9fa48("1295") ? "" : (stryCov_9fa48("1295"), "image/svg+xml"));
            }
          }
          employee.profilePictureURL = profilePictureURL;
          profile.front_identify_card_photo_URL = frontURL;
          profile.back_identify_card_photo_URL = backURL;
          employee.profile = profile;
          return await this.employeeRepository.save(employee);
        }
      } catch (error) {
        if (stryMutAct_9fa48("1296")) {
          {}
        } else {
          stryCov_9fa48("1296");
          if (stryMutAct_9fa48("1298") ? false : stryMutAct_9fa48("1297") ? true : (stryCov_9fa48("1297", "1298"), error instanceof TypeORMError)) {
            if (stryMutAct_9fa48("1299")) {
              {}
            } else {
              stryCov_9fa48("1299");
              try {
                if (stryMutAct_9fa48("1300")) {
                  {}
                } else {
                  stryCov_9fa48("1300");
                  await this.storageManager.remove(stryMutAct_9fa48("1301") ? [] : (stryCov_9fa48("1301"), [(stryMutAct_9fa48("1302") ? "" : (stryCov_9fa48("1302"), "/employee/")) + employee.id + (stryMutAct_9fa48("1303") ? "" : (stryCov_9fa48("1303"), "/front_identify_card_photo_URL.png")), (stryMutAct_9fa48("1304") ? "" : (stryCov_9fa48("1304"), "/employee/")) + employee.id + (stryMutAct_9fa48("1305") ? "" : (stryCov_9fa48("1305"), "/back_identify_card_photo_URL.png"))]));
                }
              } catch (removeError) {
                if (stryMutAct_9fa48("1306")) {
                  {}
                } else {
                  stryCov_9fa48("1306");
                  console.error(stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), "An error occurred while removing files:"), removeError);
                }
              }
            }
          }
          throw error;
        }
      }
    }
  }
  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    if (stryMutAct_9fa48("1308")) {
      {}
    } else {
      stryCov_9fa48("1308");
      let employee = await this.employeeRepository.findOne(stryMutAct_9fa48("1309") ? {} : (stryCov_9fa48("1309"), {
        where: stryMutAct_9fa48("1310") ? {} : (stryCov_9fa48("1310"), {
          id
        })
      }));
      console.log(updateEmployeeDto);
      if (stryMutAct_9fa48("1313") ? false : stryMutAct_9fa48("1312") ? true : stryMutAct_9fa48("1311") ? employee : (stryCov_9fa48("1311", "1312", "1313"), !employee)) throw new NotFoundException();
      const {
        profile_picture,
        front_identify_card_photo,
        back_identify_card_photo,
        ...rest
      } = updateEmployeeDto;
      let profile = plainToInstance(Profile, rest);
      const queryRunner = this.dataSource.createQueryRunner();
      try {
        if (stryMutAct_9fa48("1314")) {
          {}
        } else {
          stryCov_9fa48("1314");
          await queryRunner.connect();
          await queryRunner.startTransaction();
          if (stryMutAct_9fa48("1316") ? false : stryMutAct_9fa48("1315") ? true : (stryCov_9fa48("1315", "1316"), profile_picture)) {
            if (stryMutAct_9fa48("1317")) {
              {}
            } else {
              stryCov_9fa48("1317");
              const imageURL = await this.storageManager.upload(profile_picture.buffer, stryMutAct_9fa48("1318") ? `` : (stryCov_9fa48("1318"), `employee/${id}/${Date.now()}.${stryMutAct_9fa48("1321") ? profile_picture.extension && "png" : stryMutAct_9fa48("1320") ? false : stryMutAct_9fa48("1319") ? true : (stryCov_9fa48("1319", "1320", "1321"), profile_picture.extension || (stryMutAct_9fa48("1322") ? "" : (stryCov_9fa48("1322"), "png")))}`), stryMutAct_9fa48("1325") ? profile_picture.mimetype && "image/png" : stryMutAct_9fa48("1324") ? false : stryMutAct_9fa48("1323") ? true : (stryCov_9fa48("1323", "1324", "1325"), profile_picture.mimetype || (stryMutAct_9fa48("1326") ? "" : (stryCov_9fa48("1326"), "image/png"))));
              employee.profilePictureURL = imageURL;
            }
          }
          if (stryMutAct_9fa48("1328") ? false : stryMutAct_9fa48("1327") ? true : (stryCov_9fa48("1327", "1328"), front_identify_card_photo)) {
            if (stryMutAct_9fa48("1329")) {
              {}
            } else {
              stryCov_9fa48("1329");
              const imageURL = await this.storageManager.upload(front_identify_card_photo.buffer, stryMutAct_9fa48("1330") ? `` : (stryCov_9fa48("1330"), `employee/${id}/${Date.now()}.${stryMutAct_9fa48("1333") ? front_identify_card_photo.extension && "png" : stryMutAct_9fa48("1332") ? false : stryMutAct_9fa48("1331") ? true : (stryCov_9fa48("1331", "1332", "1333"), front_identify_card_photo.extension || (stryMutAct_9fa48("1334") ? "" : (stryCov_9fa48("1334"), "png")))}`), stryMutAct_9fa48("1337") ? front_identify_card_photo.mimetype && "image/png" : stryMutAct_9fa48("1336") ? false : stryMutAct_9fa48("1335") ? true : (stryCov_9fa48("1335", "1336", "1337"), front_identify_card_photo.mimetype || (stryMutAct_9fa48("1338") ? "" : (stryCov_9fa48("1338"), "image/png"))));
              profile.front_identify_card_photo_URL = imageURL;
            }
          }
          if (stryMutAct_9fa48("1340") ? false : stryMutAct_9fa48("1339") ? true : (stryCov_9fa48("1339", "1340"), back_identify_card_photo)) {
            if (stryMutAct_9fa48("1341")) {
              {}
            } else {
              stryCov_9fa48("1341");
              const imageURL = await this.storageManager.upload(back_identify_card_photo.buffer, stryMutAct_9fa48("1342") ? `` : (stryCov_9fa48("1342"), `employee/${id}/${Date.now()}.${stryMutAct_9fa48("1345") ? back_identify_card_photo.extension && "png" : stryMutAct_9fa48("1344") ? false : stryMutAct_9fa48("1343") ? true : (stryCov_9fa48("1343", "1344", "1345"), back_identify_card_photo.extension || (stryMutAct_9fa48("1346") ? "" : (stryCov_9fa48("1346"), "png")))}`), stryMutAct_9fa48("1349") ? back_identify_card_photo.mimetype && "image/png" : stryMutAct_9fa48("1348") ? false : stryMutAct_9fa48("1347") ? true : (stryCov_9fa48("1347", "1348", "1349"), back_identify_card_photo.mimetype || (stryMutAct_9fa48("1350") ? "" : (stryCov_9fa48("1350"), "image/png"))));
              profile.back_identify_card_photo_URL = imageURL;
            }
          }
          employee.id = id;
          employee.profile = profile;
          await this.employeeRepository.save(employee);
          await queryRunner.commitTransaction();
        }
      } catch (error) {
        if (stryMutAct_9fa48("1351")) {
          {}
        } else {
          stryCov_9fa48("1351");
          await queryRunner.rollbackTransaction();
          throw error;
        }
      } finally {
        if (stryMutAct_9fa48("1352")) {
          {}
        } else {
          stryCov_9fa48("1352");
          await queryRunner.release();
        }
      }
      return employee;
    }
  }

  // async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
  //     const { profile_picture, ...rest } = updateEmployeeDto;
  //     let employee = await this.employeeRepository.findOne({
  //                 where: { id },
  //             });

  //             console.log(updateEmployeeDto)

  //     if (!employee) throw new NotFoundException();

  //     let profile = plainToInstance(Profile, rest);
  //     const queryRunner = this.dataSource.createQueryRunner();
  //     if (profile_picture) {

  //         try {
  //             await queryRunner.connect();
  //             await queryRunner.startTransaction();
  //             const imageURL = await this.storageManager.upload(
  //                 profile_picture.buffer,
  //                 `employee/${id}/${Date.now()}.` +
  //                     (profile_picture.extension || "png"),
  //                     profile_picture.mimetype || "image/png",
  //             );

  //             employee.id = id;
  //             employee.profilePictureURL = imageURL;
  //             employee = await this.employeeRepository.save(employee);
  //             await queryRunner.commitTransaction();
  //         } catch (error) {
  //             if (error instanceof TypeORMError) {
  //                 try {
  //                     await this.storageManager.remove([
  //                         `employee/${id}/${Date.now()}.` +
  //                             (profile_picture.extension || "png"),
  //                             profile_picture.mimetype || "image/png",
  //                     ]);
  //                 } catch (error) {
  //                     console.error(error);
  //                 }
  //             }
  //             throw error;
  //         } finally {
  //             await queryRunner.release();
  //         }
  //     }
  //     let result = await this.employeeRepository.update(
  //         { id: id },
  //         { ...employee },
  //     );

  //     return await isQueryAffected(result);
  // }
  findOne(id: string): Promise<Employee | null> {
    if (stryMutAct_9fa48("1353")) {
      {}
    } else {
      stryCov_9fa48("1353");
      return this.employeeRepository.findOne(stryMutAct_9fa48("1354") ? {} : (stryCov_9fa48("1354"), {
        where: stryMutAct_9fa48("1355") ? {} : (stryCov_9fa48("1355"), {
          id
        }),
        cache: stryMutAct_9fa48("1356") ? false : (stryCov_9fa48("1356"), true)
      }));
    }
  }
  findAll(role?: PersonRole): Promise<Employee[]> {
    if (stryMutAct_9fa48("1357")) {
      {}
    } else {
      stryCov_9fa48("1357");
      return this.employeeRepository.find(stryMutAct_9fa48("1358") ? {} : (stryCov_9fa48("1358"), {
        where: role ? {} : {},
        cache: stryMutAct_9fa48("1359") ? false : (stryCov_9fa48("1359"), true)
      }));
    }
  }
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (stryMutAct_9fa48("1360")) {
      {}
    } else {
      stryCov_9fa48("1360");
      let result = await this.employeeRepository.update(id, (updateEmployeeDto as any));
      return isQueryAffected(result);
    }
  }
  async delete(id: string): Promise<boolean> {
    if (stryMutAct_9fa48("1361")) {
      {}
    } else {
      stryCov_9fa48("1361");
      const result = await this.employeeRepository.softDelete(stryMutAct_9fa48("1362") ? {} : (stryCov_9fa48("1362"), {
        id
      }));
      return isQueryAffected(result);
    }
  }

  // async hardDelete?(id: any): Promise<boolean> {
  //     try {
  //         const result = await this.employeeRepository.delete({ id });
  //         return isQueryAffected(result);
  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }
}
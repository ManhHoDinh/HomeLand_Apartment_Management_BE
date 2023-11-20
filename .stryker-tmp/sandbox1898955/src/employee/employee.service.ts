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
    if (stryMutAct_9fa48("408")) {
      {}
    } else {
      stryCov_9fa48("408");
      const {
        front_identify_card_photo,
        back_identify_card_photo,
        profile_picture,
        ...rest
      } = createEmployeeDto;
      const profile = plainToInstance(Profile, rest);
      // let employee = this.employeeRepository.create(rest);
      let employee = new Employee();
      if (stryMutAct_9fa48("410") ? false : stryMutAct_9fa48("409") ? true : (stryCov_9fa48("409", "410"), id)) employee.id = id;else employee.id = (stryMutAct_9fa48("411") ? "" : (stryCov_9fa48("411"), "EMP")) + this.idGenerate.generateId();
      try {
        if (stryMutAct_9fa48("412")) {
          {}
        } else {
          stryCov_9fa48("412");
          const frontPhoto = (front_identify_card_photo as MemoryStoredFile);
          const backPhoto = (front_identify_card_photo as MemoryStoredFile);
          const frontURL = await this.storageManager.upload(frontPhoto.buffer, (stryMutAct_9fa48("413") ? "" : (stryCov_9fa48("413"), "employee/")) + employee.id + (stryMutAct_9fa48("414") ? "" : (stryCov_9fa48("414"), "/front_identify_card_photo_URL.")) + (stryMutAct_9fa48("417") ? frontPhoto.extension && "png" : stryMutAct_9fa48("416") ? false : stryMutAct_9fa48("415") ? true : (stryCov_9fa48("415", "416", "417"), frontPhoto.extension || (stryMutAct_9fa48("418") ? "" : (stryCov_9fa48("418"), "png")))), stryMutAct_9fa48("421") ? frontPhoto.mimetype && "image/png" : stryMutAct_9fa48("420") ? false : stryMutAct_9fa48("419") ? true : (stryCov_9fa48("419", "420", "421"), frontPhoto.mimetype || (stryMutAct_9fa48("422") ? "" : (stryCov_9fa48("422"), "image/png"))));
          const backURL = await this.storageManager.upload(back_identify_card_photo.buffer, (stryMutAct_9fa48("423") ? "" : (stryCov_9fa48("423"), "employee/")) + employee.id + (stryMutAct_9fa48("424") ? "" : (stryCov_9fa48("424"), "/back_identify_card_photo_URL.")) + (stryMutAct_9fa48("427") ? backPhoto.extension && "png" : stryMutAct_9fa48("426") ? false : stryMutAct_9fa48("425") ? true : (stryCov_9fa48("425", "426", "427"), backPhoto.extension || (stryMutAct_9fa48("428") ? "" : (stryCov_9fa48("428"), "png")))), stryMutAct_9fa48("431") ? backPhoto.mimetype && "image/png" : stryMutAct_9fa48("430") ? false : stryMutAct_9fa48("429") ? true : (stryCov_9fa48("429", "430", "431"), backPhoto.mimetype || (stryMutAct_9fa48("432") ? "" : (stryCov_9fa48("432"), "image/png"))));
          let profilePictureURL: string | undefined = undefined;
          const avatarPhoto = createEmployeeDto.profile_picture;
          if (stryMutAct_9fa48("434") ? false : stryMutAct_9fa48("433") ? true : (stryCov_9fa48("433", "434"), avatarPhoto)) {
            if (stryMutAct_9fa48("435")) {
              {}
            } else {
              stryCov_9fa48("435");
              profilePictureURL = await this.storageManager.upload(avatarPhoto.buffer, (stryMutAct_9fa48("436") ? "" : (stryCov_9fa48("436"), "employee/")) + employee.id + (stryMutAct_9fa48("437") ? "" : (stryCov_9fa48("437"), "/avatarURL.")) + (stryMutAct_9fa48("440") ? avatarPhoto.extension && "png" : stryMutAct_9fa48("439") ? false : stryMutAct_9fa48("438") ? true : (stryCov_9fa48("438", "439", "440"), avatarPhoto.extension || (stryMutAct_9fa48("441") ? "" : (stryCov_9fa48("441"), "png")))), stryMutAct_9fa48("444") ? avatarPhoto.mimetype && "image/png" : stryMutAct_9fa48("443") ? false : stryMutAct_9fa48("442") ? true : (stryCov_9fa48("442", "443", "444"), avatarPhoto.mimetype || (stryMutAct_9fa48("445") ? "" : (stryCov_9fa48("445"), "image/png"))));
            }
          } else {
            if (stryMutAct_9fa48("446")) {
              {}
            } else {
              stryCov_9fa48("446");
              const avatar = await this.avatarGenerator.generateAvatar(profile.name);
              profilePictureURL = await this.storageManager.upload(avatar, (stryMutAct_9fa48("447") ? "" : (stryCov_9fa48("447"), "employee/")) + employee.id + (stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), "/avatarURL.svg")), stryMutAct_9fa48("449") ? "" : (stryCov_9fa48("449"), "image/svg+xml"));
            }
          }
          employee.profilePictureURL = profilePictureURL;
          profile.front_identify_card_photo_URL = frontURL;
          profile.back_identify_card_photo_URL = backURL;
          employee.profile = profile;
          return await this.employeeRepository.save(employee);
        }
      } catch (error) {
        if (stryMutAct_9fa48("450")) {
          {}
        } else {
          stryCov_9fa48("450");
          if (stryMutAct_9fa48("452") ? false : stryMutAct_9fa48("451") ? true : (stryCov_9fa48("451", "452"), error instanceof TypeORMError)) {
            if (stryMutAct_9fa48("453")) {
              {}
            } else {
              stryCov_9fa48("453");
              try {
                if (stryMutAct_9fa48("454")) {
                  {}
                } else {
                  stryCov_9fa48("454");
                  await this.storageManager.remove(stryMutAct_9fa48("455") ? [] : (stryCov_9fa48("455"), [(stryMutAct_9fa48("456") ? "" : (stryCov_9fa48("456"), "/employee/")) + employee.id + (stryMutAct_9fa48("457") ? "" : (stryCov_9fa48("457"), "/front_identify_card_photo_URL.png")), (stryMutAct_9fa48("458") ? "" : (stryCov_9fa48("458"), "/employee/")) + employee.id + (stryMutAct_9fa48("459") ? "" : (stryCov_9fa48("459"), "/back_identify_card_photo_URL.png"))]));
                }
              } catch (removeError) {
                if (stryMutAct_9fa48("460")) {
                  {}
                } else {
                  stryCov_9fa48("460");
                  console.error(stryMutAct_9fa48("461") ? "" : (stryCov_9fa48("461"), "An error occurred while removing files:"), removeError);
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
    if (stryMutAct_9fa48("462")) {
      {}
    } else {
      stryCov_9fa48("462");
      let employee = await this.employeeRepository.findOne(stryMutAct_9fa48("463") ? {} : (stryCov_9fa48("463"), {
        where: stryMutAct_9fa48("464") ? {} : (stryCov_9fa48("464"), {
          id
        })
      }));
      console.log(updateEmployeeDto);
      if (stryMutAct_9fa48("467") ? false : stryMutAct_9fa48("466") ? true : stryMutAct_9fa48("465") ? employee : (stryCov_9fa48("465", "466", "467"), !employee)) throw new NotFoundException();
      const {
        profile_picture,
        front_identify_card_photo,
        back_identify_card_photo,
        ...rest
      } = updateEmployeeDto;
      let profile = plainToInstance(Profile, rest);
      const queryRunner = this.dataSource.createQueryRunner();
      try {
        if (stryMutAct_9fa48("468")) {
          {}
        } else {
          stryCov_9fa48("468");
          await queryRunner.connect();
          await queryRunner.startTransaction();
          if (stryMutAct_9fa48("470") ? false : stryMutAct_9fa48("469") ? true : (stryCov_9fa48("469", "470"), profile_picture)) {
            if (stryMutAct_9fa48("471")) {
              {}
            } else {
              stryCov_9fa48("471");
              const imageURL = await this.storageManager.upload(profile_picture.buffer, stryMutAct_9fa48("472") ? `` : (stryCov_9fa48("472"), `employee/${id}/${Date.now()}.${stryMutAct_9fa48("475") ? profile_picture.extension && "png" : stryMutAct_9fa48("474") ? false : stryMutAct_9fa48("473") ? true : (stryCov_9fa48("473", "474", "475"), profile_picture.extension || (stryMutAct_9fa48("476") ? "" : (stryCov_9fa48("476"), "png")))}`), stryMutAct_9fa48("479") ? profile_picture.mimetype && "image/png" : stryMutAct_9fa48("478") ? false : stryMutAct_9fa48("477") ? true : (stryCov_9fa48("477", "478", "479"), profile_picture.mimetype || (stryMutAct_9fa48("480") ? "" : (stryCov_9fa48("480"), "image/png"))));
              employee.profilePictureURL = imageURL;
            }
          }
          if (stryMutAct_9fa48("482") ? false : stryMutAct_9fa48("481") ? true : (stryCov_9fa48("481", "482"), front_identify_card_photo)) {
            if (stryMutAct_9fa48("483")) {
              {}
            } else {
              stryCov_9fa48("483");
              const imageURL = await this.storageManager.upload(front_identify_card_photo.buffer, stryMutAct_9fa48("484") ? `` : (stryCov_9fa48("484"), `employee/${id}/${Date.now()}.${stryMutAct_9fa48("487") ? front_identify_card_photo.extension && "png" : stryMutAct_9fa48("486") ? false : stryMutAct_9fa48("485") ? true : (stryCov_9fa48("485", "486", "487"), front_identify_card_photo.extension || (stryMutAct_9fa48("488") ? "" : (stryCov_9fa48("488"), "png")))}`), stryMutAct_9fa48("491") ? front_identify_card_photo.mimetype && "image/png" : stryMutAct_9fa48("490") ? false : stryMutAct_9fa48("489") ? true : (stryCov_9fa48("489", "490", "491"), front_identify_card_photo.mimetype || (stryMutAct_9fa48("492") ? "" : (stryCov_9fa48("492"), "image/png"))));
              profile.front_identify_card_photo_URL = imageURL;
            }
          }
          if (stryMutAct_9fa48("494") ? false : stryMutAct_9fa48("493") ? true : (stryCov_9fa48("493", "494"), back_identify_card_photo)) {
            if (stryMutAct_9fa48("495")) {
              {}
            } else {
              stryCov_9fa48("495");
              const imageURL = await this.storageManager.upload(back_identify_card_photo.buffer, stryMutAct_9fa48("496") ? `` : (stryCov_9fa48("496"), `employee/${id}/${Date.now()}.${stryMutAct_9fa48("499") ? back_identify_card_photo.extension && "png" : stryMutAct_9fa48("498") ? false : stryMutAct_9fa48("497") ? true : (stryCov_9fa48("497", "498", "499"), back_identify_card_photo.extension || (stryMutAct_9fa48("500") ? "" : (stryCov_9fa48("500"), "png")))}`), stryMutAct_9fa48("503") ? back_identify_card_photo.mimetype && "image/png" : stryMutAct_9fa48("502") ? false : stryMutAct_9fa48("501") ? true : (stryCov_9fa48("501", "502", "503"), back_identify_card_photo.mimetype || (stryMutAct_9fa48("504") ? "" : (stryCov_9fa48("504"), "image/png"))));
              profile.back_identify_card_photo_URL = imageURL;
            }
          }
          employee.id = id;
          employee.profile = profile;
          await this.employeeRepository.save(employee);
          await queryRunner.commitTransaction();
        }
      } catch (error) {
        if (stryMutAct_9fa48("505")) {
          {}
        } else {
          stryCov_9fa48("505");
          await queryRunner.rollbackTransaction();
          throw error;
        }
      } finally {
        if (stryMutAct_9fa48("506")) {
          {}
        } else {
          stryCov_9fa48("506");
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
    if (stryMutAct_9fa48("507")) {
      {}
    } else {
      stryCov_9fa48("507");
      return this.employeeRepository.findOne(stryMutAct_9fa48("508") ? {} : (stryCov_9fa48("508"), {
        where: stryMutAct_9fa48("509") ? {} : (stryCov_9fa48("509"), {
          id
        }),
        cache: stryMutAct_9fa48("510") ? false : (stryCov_9fa48("510"), true)
      }));
    }
  }
  findAll(role?: PersonRole): Promise<Employee[]> {
    if (stryMutAct_9fa48("511")) {
      {}
    } else {
      stryCov_9fa48("511");
      return this.employeeRepository.find(stryMutAct_9fa48("512") ? {} : (stryCov_9fa48("512"), {
        where: role ? {} : {},
        cache: stryMutAct_9fa48("513") ? false : (stryCov_9fa48("513"), true)
      }));
    }
  }
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (stryMutAct_9fa48("514")) {
      {}
    } else {
      stryCov_9fa48("514");
      let result = await this.employeeRepository.update(id, (updateEmployeeDto as any));
      return isQueryAffected(result);
    }
  }
  async delete(id: string): Promise<boolean> {
    if (stryMutAct_9fa48("515")) {
      {}
    } else {
      stryCov_9fa48("515");
      const result = await this.employeeRepository.softDelete(stryMutAct_9fa48("516") ? {} : (stryCov_9fa48("516"), {
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
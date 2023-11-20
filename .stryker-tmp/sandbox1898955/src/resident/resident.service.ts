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
import { UpdateResidentDto } from "./dto/update-resident.dto";
import { Resident } from "./entities/resident.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository, TypeORMError } from "typeorm";
import { StorageManager } from "../storage/storage.service";
import { isQueryAffected } from "../helper/validation";
import { IRepository } from "../helper/interface/IRepository.interface";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { MemoryStoredFile } from "nestjs-form-data";
import { Profile } from "../helper/class/profile.entity";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { IdGenerator } from "../id-generator/id-generator.service";
import { plainToInstance } from "class-transformer";
import { Account } from "../account/entities/account.entity";
import { HashService } from "../hash/hash.service";

/**
 * Person repository interface
 */
export abstract class ResidentRepository implements IRepository<Resident> {
  abstract findOne(id: string): Promise<Resident | null>;
  abstract update(id: string, updateEntityDto: any);
  abstract delete(id: string);
  // abstract findOneByEmail(email: string): Promise<Resident | null>;
  abstract create(createResidentDto: CreateResidentDto, id?: string): Promise<Resident>;
  // abstract createAccount(
  //     id: string,
  //     createAccountDto: CreateAccountDto,
  // ): Promise<Resident>;
  abstract updateResident(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident>;
  abstract findAll(): Promise<Resident[]>;
  abstract search(query: string): Promise<Resident[]>;
}
@Injectable()
export class ResidentService implements ResidentRepository {
  constructor(@InjectRepository(Resident)
  private readonly residentRepository: Repository<Resident>, @InjectRepository(Account)
  private readonly accountRepository: Repository<Account>, private readonly storageManager: StorageManager, private readonly hashService: HashService, private readonly idGenerate: IdGenerator, private readonly avatarGenerator: AvatarGenerator) {}
  //get person by id
  //create person

  /**
   * Create a person and insert into database
   * @param createPersonDto JSON object to create person
   * @param creatorRole role of who evoke this function
   * @default creatorRole undefined
   * @param id set the id of person, if not set, id will be generated
   * @default id undefined
   * @returns inserted person
   */
  async create(createResidentDto: CreateResidentDto, id?: string): Promise<Resident> {
    if (stryMutAct_9fa48("616")) {
      {}
    } else {
      stryCov_9fa48("616");
      const {
        front_identify_card_photo,
        back_identify_card_photo,
        avatar_photo,
        payment_info,
        email,
        ...rest
      } = createResidentDto;
      const profile = plainToInstance(Profile, rest);
      let resident = new Resident();
      resident.payment_info = payment_info;
      if (stryMutAct_9fa48("618") ? false : stryMutAct_9fa48("617") ? true : (stryCov_9fa48("617", "618"), id)) resident.id = id;else resident.id = (stryMutAct_9fa48("619") ? "" : (stryCov_9fa48("619"), "RES")) + this.idGenerate.generateId();
      try {
        if (stryMutAct_9fa48("620")) {
          {}
        } else {
          stryCov_9fa48("620");
          const frontPhoto = (front_identify_card_photo as MemoryStoredFile);
          const backPhoto = (front_identify_card_photo as MemoryStoredFile);
          console.log(front_identify_card_photo);
          const frontURL = await this.storageManager.upload(frontPhoto.buffer, (stryMutAct_9fa48("621") ? "" : (stryCov_9fa48("621"), "resident/")) + resident.id + (stryMutAct_9fa48("622") ? "" : (stryCov_9fa48("622"), "/front_identify_card_photo_URL.")) + (stryMutAct_9fa48("625") ? frontPhoto.extension && "png" : stryMutAct_9fa48("624") ? false : stryMutAct_9fa48("623") ? true : (stryCov_9fa48("623", "624", "625"), frontPhoto.extension || (stryMutAct_9fa48("626") ? "" : (stryCov_9fa48("626"), "png")))), stryMutAct_9fa48("629") ? frontPhoto.mimetype && "image/png" : stryMutAct_9fa48("628") ? false : stryMutAct_9fa48("627") ? true : (stryCov_9fa48("627", "628", "629"), frontPhoto.mimetype || (stryMutAct_9fa48("630") ? "" : (stryCov_9fa48("630"), "image/png"))));
          const backURL = await this.storageManager.upload(backPhoto.buffer, (stryMutAct_9fa48("631") ? "" : (stryCov_9fa48("631"), "resident/")) + resident.id + (stryMutAct_9fa48("632") ? "" : (stryCov_9fa48("632"), "/back_identify_card_photo_URL.")) + (stryMutAct_9fa48("635") ? backPhoto.extension && "png" : stryMutAct_9fa48("634") ? false : stryMutAct_9fa48("633") ? true : (stryCov_9fa48("633", "634", "635"), backPhoto.extension || (stryMutAct_9fa48("636") ? "" : (stryCov_9fa48("636"), "png")))), stryMutAct_9fa48("639") ? backPhoto.mimetype && "image/png" : stryMutAct_9fa48("638") ? false : stryMutAct_9fa48("637") ? true : (stryCov_9fa48("637", "638", "639"), backPhoto.mimetype || (stryMutAct_9fa48("640") ? "" : (stryCov_9fa48("640"), "image/png"))));
          let avatarURL: string | undefined;
          // const avatarPhoto = avatar_photo as MemoryStoredFile;

          if (stryMutAct_9fa48("642") ? false : stryMutAct_9fa48("641") ? true : (stryCov_9fa48("641", "642"), avatar_photo)) {
            if (stryMutAct_9fa48("643")) {
              {}
            } else {
              stryCov_9fa48("643");
              const avataPhoto = (avatar_photo as MemoryStoredFile);
              avatarURL = await this.storageManager.upload(avataPhoto.buffer, (stryMutAct_9fa48("644") ? "" : (stryCov_9fa48("644"), "resident/")) + resident.id + (stryMutAct_9fa48("645") ? "" : (stryCov_9fa48("645"), "/avatarURL.")) + (stryMutAct_9fa48("648") ? avataPhoto.extension && "png" : stryMutAct_9fa48("647") ? false : stryMutAct_9fa48("646") ? true : (stryCov_9fa48("646", "647", "648"), avataPhoto.extension || (stryMutAct_9fa48("649") ? "" : (stryCov_9fa48("649"), "png")))), stryMutAct_9fa48("652") ? avataPhoto.mimetype && "image/png" : stryMutAct_9fa48("651") ? false : stryMutAct_9fa48("650") ? true : (stryCov_9fa48("650", "651", "652"), avataPhoto.mimetype || (stryMutAct_9fa48("653") ? "" : (stryCov_9fa48("653"), "image/png"))));
            }
          } else {
            if (stryMutAct_9fa48("654")) {
              {}
            } else {
              stryCov_9fa48("654");
              const avatar = await this.avatarGenerator.generateAvatar(profile.name);
              avatarURL = await this.storageManager.upload(avatar, (stryMutAct_9fa48("655") ? "" : (stryCov_9fa48("655"), "resident/")) + resident.id + (stryMutAct_9fa48("656") ? "" : (stryCov_9fa48("656"), "/avatarURL.svg")), stryMutAct_9fa48("657") ? "" : (stryCov_9fa48("657"), "image/svg+xml"));
            }
          }
          profile.front_identify_card_photo_URL = frontURL;
          profile.back_identify_card_photo_URL = backURL;
          resident.profile = profile;
          const residentData = await this.residentRepository.save(resident);
          //set account
          if (stryMutAct_9fa48("659") ? false : stryMutAct_9fa48("658") ? true : (stryCov_9fa48("658", "659"), email)) {
            if (stryMutAct_9fa48("660")) {
              {}
            } else {
              stryCov_9fa48("660");
              resident.account_id = resident.id;
              let account = new Account();
              account.owner_id = resident.account_id;
              account.email = email;
              account.password = this.hashService.hash(profile.phone_number);
              account.avatarURL = avatarURL;
              account.resident = resident;
              await this.accountRepository.save(account);
            }
          }
          return residentData;
        }
      } catch (error) {
        if (stryMutAct_9fa48("661")) {
          {}
        } else {
          stryCov_9fa48("661");
          if (stryMutAct_9fa48("663") ? false : stryMutAct_9fa48("662") ? true : (stryCov_9fa48("662", "663"), error instanceof TypeORMError)) {
            if (stryMutAct_9fa48("664")) {
              {}
            } else {
              stryCov_9fa48("664");
              try {
                if (stryMutAct_9fa48("665")) {
                  {}
                } else {
                  stryCov_9fa48("665");
                  await this.storageManager.remove(stryMutAct_9fa48("666") ? [] : (stryCov_9fa48("666"), [(stryMutAct_9fa48("667") ? "" : (stryCov_9fa48("667"), "/resident/")) + resident.id + (stryMutAct_9fa48("668") ? "" : (stryCov_9fa48("668"), "/front_identify_card_photo_URL.png")), (stryMutAct_9fa48("669") ? "" : (stryCov_9fa48("669"), "/resident/")) + resident.id + (stryMutAct_9fa48("670") ? "" : (stryCov_9fa48("670"), "/back_identify_card_photo_URL.png"))]));
                }
              } catch (error) {
                if (stryMutAct_9fa48("671")) {
                  {}
                } else {
                  stryCov_9fa48("671");
                  console.error(error);
                }
              }
            }
          }
          throw new Error(stryMutAct_9fa48("672") ? "" : (stryCov_9fa48("672"), "Can not create resident"));
        }
      }
    }
  }
  async search(query: string): Promise<Resident[]> {
    if (stryMutAct_9fa48("673")) {
      {}
    } else {
      stryCov_9fa48("673");
      const result = await this.residentRepository.find(stryMutAct_9fa48("674") ? {} : (stryCov_9fa48("674"), {
        where: stryMutAct_9fa48("675") ? {} : (stryCov_9fa48("675"), {
          profile: stryMutAct_9fa48("676") ? {} : (stryCov_9fa48("676"), {
            name: Like(stryMutAct_9fa48("677") ? `` : (stryCov_9fa48("677"), `%${query}%`))
          })
        })
      }));
      return result;
    }
  }
  async updateResident(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident> {
    if (stryMutAct_9fa48("678")) {
      {}
    } else {
      stryCov_9fa48("678");
      let resident = await this.residentRepository.findOne(stryMutAct_9fa48("679") ? {} : (stryCov_9fa48("679"), {
        where: stryMutAct_9fa48("680") ? {} : (stryCov_9fa48("680"), {
          id
        })
      }));
      console.log(updateResidentDto);
      const {
        payment_info,
        avatar_photo,
        email,
        ...rest
      } = updateResidentDto;
      if (stryMutAct_9fa48("683") ? false : stryMutAct_9fa48("682") ? true : stryMutAct_9fa48("681") ? resident : (stryCov_9fa48("681", "682", "683"), !resident)) throw new NotFoundException();
      const account = await this.accountRepository.findOne(stryMutAct_9fa48("684") ? {} : (stryCov_9fa48("684"), {
        where: stryMutAct_9fa48("685") ? {} : (stryCov_9fa48("685"), {
          owner_id: id
        })
      }));
      resident.payment_info = payment_info;
      let profile = plainToInstance(Profile, rest);
      let avatarURL: string | undefined;
      if (stryMutAct_9fa48("687") ? false : stryMutAct_9fa48("686") ? true : (stryCov_9fa48("686", "687"), avatar_photo)) {
        if (stryMutAct_9fa48("688")) {
          {}
        } else {
          stryCov_9fa48("688");
          const avataPhoto = (avatar_photo as MemoryStoredFile);
          avatarURL = await this.storageManager.upload(avataPhoto.buffer, (stryMutAct_9fa48("689") ? "" : (stryCov_9fa48("689"), "resident/")) + resident.id + (stryMutAct_9fa48("690") ? "" : (stryCov_9fa48("690"), "/avatarURL.")) + (stryMutAct_9fa48("693") ? avataPhoto.extension && "png" : stryMutAct_9fa48("692") ? false : stryMutAct_9fa48("691") ? true : (stryCov_9fa48("691", "692", "693"), avataPhoto.extension || (stryMutAct_9fa48("694") ? "" : (stryCov_9fa48("694"), "png")))), stryMutAct_9fa48("697") ? avataPhoto.mimetype && "image/png" : stryMutAct_9fa48("696") ? false : stryMutAct_9fa48("695") ? true : (stryCov_9fa48("695", "696", "697"), avataPhoto.mimetype || (stryMutAct_9fa48("698") ? "" : (stryCov_9fa48("698"), "image/png"))));
        }
      }
      if (stryMutAct_9fa48("701") ? account === null : stryMutAct_9fa48("700") ? false : stryMutAct_9fa48("699") ? true : (stryCov_9fa48("699", "700", "701"), account !== null)) {
        if (stryMutAct_9fa48("702")) {
          {}
        } else {
          stryCov_9fa48("702");
          account.email = (email as string);
          if (stryMutAct_9fa48("704") ? false : stryMutAct_9fa48("703") ? true : (stryCov_9fa48("703", "704"), avatarURL)) {
            if (stryMutAct_9fa48("705")) {
              {}
            } else {
              stryCov_9fa48("705");
              account.avatarURL = avatarURL;
            }
          }
          await this.accountRepository.save(account);
        }
      }
      resident.profile = profile;
      return await this.residentRepository.save(resident);
    }
  }
  findOne(id: string): Promise<Resident | null> {
    if (stryMutAct_9fa48("706")) {
      {}
    } else {
      stryCov_9fa48("706");
      return this.residentRepository.findOne(stryMutAct_9fa48("707") ? {} : (stryCov_9fa48("707"), {
        where: stryMutAct_9fa48("708") ? {} : (stryCov_9fa48("708"), {
          id
        }),
        cache: stryMutAct_9fa48("709") ? false : (stryCov_9fa48("709"), true),
        relations: stryMutAct_9fa48("710") ? [] : (stryCov_9fa48("710"), [stryMutAct_9fa48("711") ? "" : (stryCov_9fa48("711"), "account")])
      }));
    }
  }

  // findOneByEmail(email: string): Promise<Resident | null> {
  //     return this.residentRepository.findOne({
  //         where: {
  //             ac
  //         },
  //         cache: true,
  //     });
  // }

  async update(id: string, UpdateResidentDto: UpdateResidentDto) {
    if (stryMutAct_9fa48("712")) {
      {}
    } else {
      stryCov_9fa48("712");
      let result = await this.residentRepository.update(id, UpdateResidentDto);
      return result;
    }
  }
  async delete(id: string) {
    if (stryMutAct_9fa48("713")) {
      {}
    } else {
      stryCov_9fa48("713");
      try {
        if (stryMutAct_9fa48("714")) {
          {}
        } else {
          stryCov_9fa48("714");
          const result = await this.residentRepository.softDelete(stryMutAct_9fa48("715") ? {} : (stryCov_9fa48("715"), {
            id
          }));
          return result;
        }
      } catch (err) {
        if (stryMutAct_9fa48("716")) {
          {}
        } else {
          stryCov_9fa48("716");
          throw new Error(stryMutAct_9fa48("717") ? "" : (stryCov_9fa48("717"), "Can not delete resident"));
        }
      }
    }
  }
  async findAll(): Promise<Resident[]> {
    if (stryMutAct_9fa48("718")) {
      {}
    } else {
      stryCov_9fa48("718");
      const residents = await this.residentRepository.find(stryMutAct_9fa48("719") ? {} : (stryCov_9fa48("719"), {
        relations: stryMutAct_9fa48("720") ? [] : (stryCov_9fa48("720"), [stryMutAct_9fa48("721") ? "" : (stryCov_9fa48("721"), "account")])
      }));
      return residents;
    }
  }
}
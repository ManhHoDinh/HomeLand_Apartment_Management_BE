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
    if (stryMutAct_9fa48("1727")) {
      {}
    } else {
      stryCov_9fa48("1727");
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
      if (stryMutAct_9fa48("1729") ? false : stryMutAct_9fa48("1728") ? true : (stryCov_9fa48("1728", "1729"), id)) resident.id = id;else resident.id = (stryMutAct_9fa48("1730") ? "" : (stryCov_9fa48("1730"), "RES")) + this.idGenerate.generateId();
      try {
        if (stryMutAct_9fa48("1731")) {
          {}
        } else {
          stryCov_9fa48("1731");
          const frontPhoto = (front_identify_card_photo as MemoryStoredFile);
          const backPhoto = (front_identify_card_photo as MemoryStoredFile);
          console.log(front_identify_card_photo);
          const frontURL = await this.storageManager.upload(frontPhoto.buffer, (stryMutAct_9fa48("1732") ? "" : (stryCov_9fa48("1732"), "resident/")) + resident.id + (stryMutAct_9fa48("1733") ? "" : (stryCov_9fa48("1733"), "/front_identify_card_photo_URL.")) + (stryMutAct_9fa48("1736") ? frontPhoto.extension && "png" : stryMutAct_9fa48("1735") ? false : stryMutAct_9fa48("1734") ? true : (stryCov_9fa48("1734", "1735", "1736"), frontPhoto.extension || (stryMutAct_9fa48("1737") ? "" : (stryCov_9fa48("1737"), "png")))), stryMutAct_9fa48("1740") ? frontPhoto.mimetype && "image/png" : stryMutAct_9fa48("1739") ? false : stryMutAct_9fa48("1738") ? true : (stryCov_9fa48("1738", "1739", "1740"), frontPhoto.mimetype || (stryMutAct_9fa48("1741") ? "" : (stryCov_9fa48("1741"), "image/png"))));
          const backURL = await this.storageManager.upload(backPhoto.buffer, (stryMutAct_9fa48("1742") ? "" : (stryCov_9fa48("1742"), "resident/")) + resident.id + (stryMutAct_9fa48("1743") ? "" : (stryCov_9fa48("1743"), "/back_identify_card_photo_URL.")) + (stryMutAct_9fa48("1746") ? backPhoto.extension && "png" : stryMutAct_9fa48("1745") ? false : stryMutAct_9fa48("1744") ? true : (stryCov_9fa48("1744", "1745", "1746"), backPhoto.extension || (stryMutAct_9fa48("1747") ? "" : (stryCov_9fa48("1747"), "png")))), stryMutAct_9fa48("1750") ? backPhoto.mimetype && "image/png" : stryMutAct_9fa48("1749") ? false : stryMutAct_9fa48("1748") ? true : (stryCov_9fa48("1748", "1749", "1750"), backPhoto.mimetype || (stryMutAct_9fa48("1751") ? "" : (stryCov_9fa48("1751"), "image/png"))));
          let avatarURL: string | undefined;
          // const avatarPhoto = avatar_photo as MemoryStoredFile;

          if (stryMutAct_9fa48("1753") ? false : stryMutAct_9fa48("1752") ? true : (stryCov_9fa48("1752", "1753"), avatar_photo)) {
            if (stryMutAct_9fa48("1754")) {
              {}
            } else {
              stryCov_9fa48("1754");
              const avataPhoto = (avatar_photo as MemoryStoredFile);
              avatarURL = await this.storageManager.upload(avataPhoto.buffer, (stryMutAct_9fa48("1755") ? "" : (stryCov_9fa48("1755"), "resident/")) + resident.id + (stryMutAct_9fa48("1756") ? "" : (stryCov_9fa48("1756"), "/avatarURL.")) + (stryMutAct_9fa48("1759") ? avataPhoto.extension && "png" : stryMutAct_9fa48("1758") ? false : stryMutAct_9fa48("1757") ? true : (stryCov_9fa48("1757", "1758", "1759"), avataPhoto.extension || (stryMutAct_9fa48("1760") ? "" : (stryCov_9fa48("1760"), "png")))), stryMutAct_9fa48("1763") ? avataPhoto.mimetype && "image/png" : stryMutAct_9fa48("1762") ? false : stryMutAct_9fa48("1761") ? true : (stryCov_9fa48("1761", "1762", "1763"), avataPhoto.mimetype || (stryMutAct_9fa48("1764") ? "" : (stryCov_9fa48("1764"), "image/png"))));
            }
          } else {
            if (stryMutAct_9fa48("1765")) {
              {}
            } else {
              stryCov_9fa48("1765");
              const avatar = await this.avatarGenerator.generateAvatar(profile.name);
              avatarURL = await this.storageManager.upload(avatar, (stryMutAct_9fa48("1766") ? "" : (stryCov_9fa48("1766"), "resident/")) + resident.id + (stryMutAct_9fa48("1767") ? "" : (stryCov_9fa48("1767"), "/avatarURL.svg")), stryMutAct_9fa48("1768") ? "" : (stryCov_9fa48("1768"), "image/svg+xml"));
            }
          }
          profile.front_identify_card_photo_URL = frontURL;
          profile.back_identify_card_photo_URL = backURL;
          resident.profile = profile;
          const residentData = await this.residentRepository.save(resident);
          //set account
          if (stryMutAct_9fa48("1770") ? false : stryMutAct_9fa48("1769") ? true : (stryCov_9fa48("1769", "1770"), email)) {
            if (stryMutAct_9fa48("1771")) {
              {}
            } else {
              stryCov_9fa48("1771");
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
        if (stryMutAct_9fa48("1772")) {
          {}
        } else {
          stryCov_9fa48("1772");
          if (stryMutAct_9fa48("1774") ? false : stryMutAct_9fa48("1773") ? true : (stryCov_9fa48("1773", "1774"), error instanceof TypeORMError)) {
            if (stryMutAct_9fa48("1775")) {
              {}
            } else {
              stryCov_9fa48("1775");
              try {
                if (stryMutAct_9fa48("1776")) {
                  {}
                } else {
                  stryCov_9fa48("1776");
                  await this.storageManager.remove(stryMutAct_9fa48("1777") ? [] : (stryCov_9fa48("1777"), [(stryMutAct_9fa48("1778") ? "" : (stryCov_9fa48("1778"), "/resident/")) + resident.id + (stryMutAct_9fa48("1779") ? "" : (stryCov_9fa48("1779"), "/front_identify_card_photo_URL.png")), (stryMutAct_9fa48("1780") ? "" : (stryCov_9fa48("1780"), "/resident/")) + resident.id + (stryMutAct_9fa48("1781") ? "" : (stryCov_9fa48("1781"), "/back_identify_card_photo_URL.png"))]));
                }
              } catch (error) {
                if (stryMutAct_9fa48("1782")) {
                  {}
                } else {
                  stryCov_9fa48("1782");
                  console.error(error);
                }
              }
            }
          }
          throw new Error(stryMutAct_9fa48("1783") ? "" : (stryCov_9fa48("1783"), "Can not create resident"));
        }
      }
    }
  }
  async search(query: string): Promise<Resident[]> {
    if (stryMutAct_9fa48("1784")) {
      {}
    } else {
      stryCov_9fa48("1784");
      const result = await this.residentRepository.find(stryMutAct_9fa48("1785") ? {} : (stryCov_9fa48("1785"), {
        where: stryMutAct_9fa48("1786") ? {} : (stryCov_9fa48("1786"), {
          profile: stryMutAct_9fa48("1787") ? {} : (stryCov_9fa48("1787"), {
            name: Like(stryMutAct_9fa48("1788") ? `` : (stryCov_9fa48("1788"), `%${query}%`))
          })
        })
      }));
      return result;
    }
  }
  async updateResident(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident> {
    if (stryMutAct_9fa48("1789")) {
      {}
    } else {
      stryCov_9fa48("1789");
      let resident = await this.residentRepository.findOne(stryMutAct_9fa48("1790") ? {} : (stryCov_9fa48("1790"), {
        where: stryMutAct_9fa48("1791") ? {} : (stryCov_9fa48("1791"), {
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
      if (stryMutAct_9fa48("1794") ? false : stryMutAct_9fa48("1793") ? true : stryMutAct_9fa48("1792") ? resident : (stryCov_9fa48("1792", "1793", "1794"), !resident)) throw new NotFoundException();
      const account = await this.accountRepository.findOne(stryMutAct_9fa48("1795") ? {} : (stryCov_9fa48("1795"), {
        where: stryMutAct_9fa48("1796") ? {} : (stryCov_9fa48("1796"), {
          owner_id: id
        })
      }));
      resident.payment_info = payment_info;
      let profile = plainToInstance(Profile, rest);
      let avatarURL: string | undefined;
      if (stryMutAct_9fa48("1798") ? false : stryMutAct_9fa48("1797") ? true : (stryCov_9fa48("1797", "1798"), avatar_photo)) {
        if (stryMutAct_9fa48("1799")) {
          {}
        } else {
          stryCov_9fa48("1799");
          const avataPhoto = (avatar_photo as MemoryStoredFile);
          avatarURL = await this.storageManager.upload(avataPhoto.buffer, (stryMutAct_9fa48("1800") ? "" : (stryCov_9fa48("1800"), "resident/")) + resident.id + (stryMutAct_9fa48("1801") ? "" : (stryCov_9fa48("1801"), "/avatarURL.")) + (stryMutAct_9fa48("1804") ? avataPhoto.extension && "png" : stryMutAct_9fa48("1803") ? false : stryMutAct_9fa48("1802") ? true : (stryCov_9fa48("1802", "1803", "1804"), avataPhoto.extension || (stryMutAct_9fa48("1805") ? "" : (stryCov_9fa48("1805"), "png")))), stryMutAct_9fa48("1808") ? avataPhoto.mimetype && "image/png" : stryMutAct_9fa48("1807") ? false : stryMutAct_9fa48("1806") ? true : (stryCov_9fa48("1806", "1807", "1808"), avataPhoto.mimetype || (stryMutAct_9fa48("1809") ? "" : (stryCov_9fa48("1809"), "image/png"))));
        }
      }
      if (stryMutAct_9fa48("1812") ? account === null : stryMutAct_9fa48("1811") ? false : stryMutAct_9fa48("1810") ? true : (stryCov_9fa48("1810", "1811", "1812"), account !== null)) {
        if (stryMutAct_9fa48("1813")) {
          {}
        } else {
          stryCov_9fa48("1813");
          account.email = (email as string);
          if (stryMutAct_9fa48("1815") ? false : stryMutAct_9fa48("1814") ? true : (stryCov_9fa48("1814", "1815"), avatarURL)) {
            if (stryMutAct_9fa48("1816")) {
              {}
            } else {
              stryCov_9fa48("1816");
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
    if (stryMutAct_9fa48("1817")) {
      {}
    } else {
      stryCov_9fa48("1817");
      return this.residentRepository.findOne(stryMutAct_9fa48("1818") ? {} : (stryCov_9fa48("1818"), {
        where: stryMutAct_9fa48("1819") ? {} : (stryCov_9fa48("1819"), {
          id
        }),
        cache: stryMutAct_9fa48("1820") ? false : (stryCov_9fa48("1820"), true),
        relations: stryMutAct_9fa48("1821") ? [] : (stryCov_9fa48("1821"), [stryMutAct_9fa48("1822") ? "" : (stryCov_9fa48("1822"), "account")])
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
    if (stryMutAct_9fa48("1823")) {
      {}
    } else {
      stryCov_9fa48("1823");
      let result = await this.residentRepository.update(id, UpdateResidentDto);
      return result;
    }
  }
  async delete(id: string) {
    if (stryMutAct_9fa48("1824")) {
      {}
    } else {
      stryCov_9fa48("1824");
      try {
        if (stryMutAct_9fa48("1825")) {
          {}
        } else {
          stryCov_9fa48("1825");
          const result = await this.residentRepository.softDelete(stryMutAct_9fa48("1826") ? {} : (stryCov_9fa48("1826"), {
            id
          }));
          return result;
        }
      } catch (err) {
        if (stryMutAct_9fa48("1827")) {
          {}
        } else {
          stryCov_9fa48("1827");
          throw new Error(stryMutAct_9fa48("1828") ? "" : (stryCov_9fa48("1828"), "Can not delete resident"));
        }
      }
    }
  }
  async findAll(): Promise<Resident[]> {
    if (stryMutAct_9fa48("1829")) {
      {}
    } else {
      stryCov_9fa48("1829");
      const residents = await this.residentRepository.find(stryMutAct_9fa48("1830") ? {} : (stryCov_9fa48("1830"), {
        relations: stryMutAct_9fa48("1831") ? [] : (stryCov_9fa48("1831"), [stryMutAct_9fa48("1832") ? "" : (stryCov_9fa48("1832"), "account")])
      }));
      return residents;
    }
  }
}
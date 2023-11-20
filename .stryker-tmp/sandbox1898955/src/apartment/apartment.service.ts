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
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { DataSource, In, Repository } from "typeorm";
import { Apartment } from "./entities/apartment.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StorageError, StorageManager } from "../storage/storage.service";
import { IdGenerator } from "../id-generator/id-generator.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { Resident } from "../resident/entities/resident.entity";
import { MemoryStoredFile } from "nestjs-form-data";
import { difference, isString } from "lodash";
import { isQueryAffected } from "../helper/validation";

/**
 * @classdesc Represent the service that manage the apartment
 * @abstract
 */
export abstract class ApartmentService implements IRepository<Apartment> {
  /**
   * @param id id of the apartment
   */
  abstract findOne(id: string): Promise<Apartment | null>;

  /**
   * @param id id of the apartment
   */
  abstract update(id: string, updateEntityDto: UpdateApartmentDto): Promise<boolean>;

  /**
   * @abstract
   * @param id id of the apartment
   */
  abstract delete(id: string);
  /**
   *
   * @param createPropertyDto
   * @param id optional id of the apartment
   */
  abstract create(createPropertyDto: CreateApartmentDto, id?: string): Promise<Apartment>;
  abstract findAll(page?: number): Promise<Apartment[]>;
}
@Injectable()
export class ApartmentServiceImp extends ApartmentService {
  constructor(@InjectRepository(Apartment)
  private readonly apartmentRepository: Repository<Apartment>, @InjectRepository(Resident)
  private readonly residentRepository: Repository<Resident>, @InjectDataSource()
  private readonly dataSource: DataSource, private readonly idGenerate: IdGenerator, private readonly storageManager: StorageManager) {
    super();
  }
  async create(createApartmentDto: CreateApartmentDto, id?: string): Promise<Apartment> {
    if (stryMutAct_9fa48("50")) {
      {}
    } else {
      stryCov_9fa48("50");
      const {
        images,
        ...rest
      } = createApartmentDto;
      let apartment = this.apartmentRepository.create(rest);
      apartment.apartment_id = (stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), "APM")) + this.idGenerate.generateId();
      if (stryMutAct_9fa48("53") ? false : stryMutAct_9fa48("52") ? true : (stryCov_9fa48("52", "53"), id)) apartment.apartment_id = id;
      const queryRunnder = this.dataSource.createQueryRunner();
      let uploadResults: PromiseSettledResult<string>[] = stryMutAct_9fa48("54") ? ["Stryker was here"] : (stryCov_9fa48("54"), []);
      try {
        if (stryMutAct_9fa48("55")) {
          {}
        } else {
          stryCov_9fa48("55");
          await queryRunnder.connect();
          await queryRunnder.startTransaction();
          uploadResults = await Promise.allSettled(createApartmentDto.images.map(stryMutAct_9fa48("56") ? () => undefined : (stryCov_9fa48("56"), (image, index) => this.storageManager.upload(image.buffer, stryMutAct_9fa48("57") ? `` : (stryCov_9fa48("57"), `apartment/${apartment.apartment_id}/${stryMutAct_9fa48("58") ? index + Date.now() - (image.extension || ".png") : (stryCov_9fa48("58"), (stryMutAct_9fa48("59") ? index - Date.now() : (stryCov_9fa48("59"), index + Date.now())) + (stryMutAct_9fa48("62") ? image.extension && ".png" : stryMutAct_9fa48("61") ? false : stryMutAct_9fa48("60") ? true : (stryCov_9fa48("60", "61", "62"), image.extension || (stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), ".png")))))}`), stryMutAct_9fa48("66") ? `image/${image.extension}` && "image/png" : stryMutAct_9fa48("65") ? false : stryMutAct_9fa48("64") ? true : (stryCov_9fa48("64", "65", "66"), (stryMutAct_9fa48("67") ? `` : (stryCov_9fa48("67"), `image/${image.extension}`)) || (stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), "image/png")))))));
          if (stryMutAct_9fa48("71") ? false : stryMutAct_9fa48("70") ? true : stryMutAct_9fa48("69") ? this.isPromiseFulfilledResultArray(uploadResults) : (stryCov_9fa48("69", "70", "71"), !this.isPromiseFulfilledResultArray(uploadResults))) {
            if (stryMutAct_9fa48("72")) {
              {}
            } else {
              stryCov_9fa48("72");
              throw new StorageError(stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "Some image upload failed"));
            }
          }
          apartment.imageURLs = uploadResults.map(stryMutAct_9fa48("74") ? () => undefined : (stryCov_9fa48("74"), result => result.value));
          if (stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75", "76"), createApartmentDto.residentIds)) {
            if (stryMutAct_9fa48("77")) {
              {}
            } else {
              stryCov_9fa48("77");
              const residents = await this.residentRepository.find(stryMutAct_9fa48("78") ? {} : (stryCov_9fa48("78"), {
                where: stryMutAct_9fa48("79") ? {} : (stryCov_9fa48("79"), {
                  id: In(createApartmentDto.residentIds)
                })
              }));
              if (stryMutAct_9fa48("82") ? residents.length === createApartmentDto.residentIds.length : stryMutAct_9fa48("81") ? false : stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80", "81", "82"), residents.length !== createApartmentDto.residentIds.length)) throw new NotFoundException(stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "Some resident not found"));
              apartment.residents = residents;
            }
          }
          apartment = await this.apartmentRepository.save(apartment);
          await queryRunnder.commitTransaction();
          return apartment;
        }
      } catch (error) {
        if (stryMutAct_9fa48("84")) {
          {}
        } else {
          stryCov_9fa48("84");
          await queryRunnder.rollbackTransaction();
          await this.storageManager.remove(stryMutAct_9fa48("85") ? uploadResults.map(r => r.value) : (stryCov_9fa48("85"), uploadResults.filter(stryMutAct_9fa48("86") ? () => undefined : (stryCov_9fa48("86"), (r): r is PromiseFulfilledResult<string> => this.isPromiseFulfilledResult(r))).map(stryMutAct_9fa48("87") ? () => undefined : (stryCov_9fa48("87"), r => r.value))));
          console.error(error);
          throw error;
        }
      } finally {
        if (stryMutAct_9fa48("88")) {
          {}
        } else {
          stryCov_9fa48("88");
          await queryRunnder.release();
        }
      }
    }
  }
  async findAll(page?: number) {
    if (stryMutAct_9fa48("89")) {
      {}
    } else {
      stryCov_9fa48("89");
      if (stryMutAct_9fa48("92") ? page != undefined || page != null : stryMutAct_9fa48("91") ? false : stryMutAct_9fa48("90") ? true : (stryCov_9fa48("90", "91", "92"), (stryMutAct_9fa48("94") ? page == undefined : stryMutAct_9fa48("93") ? true : (stryCov_9fa48("93", "94"), page != undefined)) && (stryMutAct_9fa48("96") ? page == null : stryMutAct_9fa48("95") ? true : (stryCov_9fa48("95", "96"), page != null)))) {
        if (stryMutAct_9fa48("97")) {
          {}
        } else {
          stryCov_9fa48("97");
          return await this.apartmentRepository.find(stryMutAct_9fa48("98") ? {} : (stryCov_9fa48("98"), {
            skip: stryMutAct_9fa48("99") ? (page - 1) / 30 : (stryCov_9fa48("99"), (stryMutAct_9fa48("100") ? page + 1 : (stryCov_9fa48("100"), page - 1)) * 30),
            take: 30
          }));
        }
      }
      return await this.apartmentRepository.find();
    }
  }
  async findOne(id: string) {
    if (stryMutAct_9fa48("101")) {
      {}
    } else {
      stryCov_9fa48("101");
      return await this.apartmentRepository.findOne(stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
        where: stryMutAct_9fa48("103") ? {} : (stryCov_9fa48("103"), {
          apartment_id: id
        })
      }));
    }
  }
  async update(id: string, updateApartmentDto: UpdateApartmentDto): Promise<boolean> {
    if (stryMutAct_9fa48("104")) {
      {}
    } else {
      stryCov_9fa48("104");
      let uploadPaths: string[] = stryMutAct_9fa48("105") ? ["Stryker was here"] : (stryCov_9fa48("105"), []);
      const queryRunnder = this.dataSource.createQueryRunner();
      try {
        if (stryMutAct_9fa48("106")) {
          {}
        } else {
          stryCov_9fa48("106");
          queryRunnder.startTransaction();
          let {
            images,
            ...rest
          } = updateApartmentDto;
          let apartment = await this.apartmentRepository.preload(stryMutAct_9fa48("107") ? {} : (stryCov_9fa48("107"), {
            apartment_id: id,
            ...rest
          }));
          if (stryMutAct_9fa48("110") ? false : stryMutAct_9fa48("109") ? true : stryMutAct_9fa48("108") ? apartment : (stryCov_9fa48("108", "109", "110"), !apartment)) throw new NotFoundException(stryMutAct_9fa48("111") ? "" : (stryCov_9fa48("111"), "Apartment Not found"));
          if (stryMutAct_9fa48("113") ? false : stryMutAct_9fa48("112") ? true : (stryCov_9fa48("112", "113"), images)) {
            if (stryMutAct_9fa48("114")) {
              {}
            } else {
              stryCov_9fa48("114");
              if (stryMutAct_9fa48("116") ? false : stryMutAct_9fa48("115") ? true : (stryCov_9fa48("115", "116"), this.newImageHaveStrangeURL(images, apartment.imageURLs))) throw new BadRequestException(stryMutAct_9fa48("117") ? "" : (stryCov_9fa48("117"), "Detect strange URL"));
              const newImages = await Promise.allSettled(images.map((element, index) => {
                if (stryMutAct_9fa48("118")) {
                  {}
                } else {
                  stryCov_9fa48("118");
                  if (stryMutAct_9fa48("120") ? false : stryMutAct_9fa48("119") ? true : (stryCov_9fa48("119", "120"), isString(element))) return element;
                  const uploadPath = stryMutAct_9fa48("121") ? `` : (stryCov_9fa48("121"), `apartment/${id}/${stryMutAct_9fa48("122") ? index + Date.now() - (element.extension || ".png") : (stryCov_9fa48("122"), (stryMutAct_9fa48("123") ? index - Date.now() : (stryCov_9fa48("123"), index + Date.now())) + (stryMutAct_9fa48("126") ? element.extension && ".png" : stryMutAct_9fa48("125") ? false : stryMutAct_9fa48("124") ? true : (stryCov_9fa48("124", "125", "126"), element.extension || (stryMutAct_9fa48("127") ? "" : (stryCov_9fa48("127"), ".png")))))}`);
                  uploadPaths.push(uploadPath);
                  return this.storageManager.upload(element.buffer, uploadPath, stryMutAct_9fa48("130") ? `image/${element.extension}` && ".png" : stryMutAct_9fa48("129") ? false : stryMutAct_9fa48("128") ? true : (stryCov_9fa48("128", "129", "130"), (stryMutAct_9fa48("131") ? `` : (stryCov_9fa48("131"), `image/${element.extension}`)) || (stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), ".png"))));
                }
              }));
              if (stryMutAct_9fa48("135") ? false : stryMutAct_9fa48("134") ? true : stryMutAct_9fa48("133") ? this.isPromiseFulfilledResultArray(newImages) : (stryCov_9fa48("133", "134", "135"), !this.isPromiseFulfilledResultArray(newImages))) throw new StorageError(stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), "Some image upload failed"));
              const newImageURLS = newImages.map(stryMutAct_9fa48("137") ? () => undefined : (stryCov_9fa48("137"), result => result.value));
              // this task can be done in parallel, will enhance later
              console.log(difference(apartment.imageURLs, newImageURLS));
              await this.storageManager.remove(difference(apartment.imageURLs, newImageURLS));
              apartment.imageURLs = newImageURLS;
            }
          }
          const result = await this.apartmentRepository.update(apartment.apartment_id, apartment);
          return isQueryAffected(result);
        }
      } catch (error) {
        if (stryMutAct_9fa48("138")) {
          {}
        } else {
          stryCov_9fa48("138");
          await queryRunnder.rollbackTransaction();
          if (stryMutAct_9fa48("142") ? uploadPaths.length <= 0 : stryMutAct_9fa48("141") ? uploadPaths.length >= 0 : stryMutAct_9fa48("140") ? false : stryMutAct_9fa48("139") ? true : (stryCov_9fa48("139", "140", "141", "142"), uploadPaths.length > 0)) await this.storageManager.remove(uploadPaths);
          console.error(error);
          throw error;
        }
      } finally {
        if (stryMutAct_9fa48("143")) {
          {}
        } else {
          stryCov_9fa48("143");
          await queryRunnder.release();
        }
      }
    }
  }
  private isPromiseFulfilledResult<T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> {
    if (stryMutAct_9fa48("144")) {
      {}
    } else {
      stryCov_9fa48("144");
      return stryMutAct_9fa48("147") ? result.status !== "fulfilled" : stryMutAct_9fa48("146") ? false : stryMutAct_9fa48("145") ? true : (stryCov_9fa48("145", "146", "147"), result.status === (stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "fulfilled")));
    }
  }
  private isPromiseFulfilledResultArray<T>(results: PromiseSettledResult<T>[]): results is PromiseFulfilledResult<T>[] {
    if (stryMutAct_9fa48("149")) {
      {}
    } else {
      stryCov_9fa48("149");
      return stryMutAct_9fa48("150") ? results.some(result => result.status === "fulfilled") : (stryCov_9fa48("150"), results.every(stryMutAct_9fa48("151") ? () => undefined : (stryCov_9fa48("151"), result => stryMutAct_9fa48("154") ? result.status !== "fulfilled" : stryMutAct_9fa48("153") ? false : stryMutAct_9fa48("152") ? true : (stryCov_9fa48("152", "153", "154"), result.status === (stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), "fulfilled"))))));
    }
  }
  private newImageHaveStrangeURL(newImages: (string | MemoryStoredFile)[], oldImageURLS: string[]) {
    if (stryMutAct_9fa48("156")) {
      {}
    } else {
      stryCov_9fa48("156");
      const newImageURLS = stryMutAct_9fa48("157") ? newImages : (stryCov_9fa48("157"), newImages.filter(stryMutAct_9fa48("158") ? () => undefined : (stryCov_9fa48("158"), (image): image is string => isString(image))));
      if (stryMutAct_9fa48("162") ? difference(newImageURLS, oldImageURLS).length <= 0 : stryMutAct_9fa48("161") ? difference(newImageURLS, oldImageURLS).length >= 0 : stryMutAct_9fa48("160") ? false : stryMutAct_9fa48("159") ? true : (stryCov_9fa48("159", "160", "161", "162"), difference(newImageURLS, oldImageURLS).length > 0)) return stryMutAct_9fa48("163") ? false : (stryCov_9fa48("163"), true);
      return stryMutAct_9fa48("164") ? true : (stryCov_9fa48("164"), false);
    }
  }
  async delete(id: string) {
    if (stryMutAct_9fa48("165")) {
      {}
    } else {
      stryCov_9fa48("165");
      return await this.apartmentRepository.softDelete(stryMutAct_9fa48("166") ? {} : (stryCov_9fa48("166"), {
        apartment_id: id
      }));
    }
  }
}
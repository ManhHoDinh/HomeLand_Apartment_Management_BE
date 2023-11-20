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
    if (stryMutAct_9fa48("163")) {
      {}
    } else {
      stryCov_9fa48("163");
      const {
        images,
        ...rest
      } = createApartmentDto;
      let apartment = this.apartmentRepository.create(rest);
      apartment.apartment_id = (stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "APM")) + this.idGenerate.generateId();
      if (stryMutAct_9fa48("166") ? false : stryMutAct_9fa48("165") ? true : (stryCov_9fa48("165", "166"), id)) apartment.apartment_id = id;
      const queryRunnder = this.dataSource.createQueryRunner();
      let uploadResults: PromiseSettledResult<string>[] = stryMutAct_9fa48("167") ? ["Stryker was here"] : (stryCov_9fa48("167"), []);
      try {
        if (stryMutAct_9fa48("168")) {
          {}
        } else {
          stryCov_9fa48("168");
          await queryRunnder.connect();
          await queryRunnder.startTransaction();
          uploadResults = await Promise.allSettled(createApartmentDto.images.map(stryMutAct_9fa48("169") ? () => undefined : (stryCov_9fa48("169"), (image, index) => this.storageManager.upload(image.buffer, stryMutAct_9fa48("170") ? `` : (stryCov_9fa48("170"), `apartment/${apartment.apartment_id}/${stryMutAct_9fa48("171") ? index + Date.now() - (image.extension || ".png") : (stryCov_9fa48("171"), (stryMutAct_9fa48("172") ? index - Date.now() : (stryCov_9fa48("172"), index + Date.now())) + (stryMutAct_9fa48("175") ? image.extension && ".png" : stryMutAct_9fa48("174") ? false : stryMutAct_9fa48("173") ? true : (stryCov_9fa48("173", "174", "175"), image.extension || (stryMutAct_9fa48("176") ? "" : (stryCov_9fa48("176"), ".png")))))}`), stryMutAct_9fa48("179") ? `image/${image.extension}` && "image/png" : stryMutAct_9fa48("178") ? false : stryMutAct_9fa48("177") ? true : (stryCov_9fa48("177", "178", "179"), (stryMutAct_9fa48("180") ? `` : (stryCov_9fa48("180"), `image/${image.extension}`)) || (stryMutAct_9fa48("181") ? "" : (stryCov_9fa48("181"), "image/png")))))));
          if (stryMutAct_9fa48("184") ? false : stryMutAct_9fa48("183") ? true : stryMutAct_9fa48("182") ? this.isPromiseFulfilledResultArray(uploadResults) : (stryCov_9fa48("182", "183", "184"), !this.isPromiseFulfilledResultArray(uploadResults))) {
            if (stryMutAct_9fa48("185")) {
              {}
            } else {
              stryCov_9fa48("185");
              throw new StorageError(stryMutAct_9fa48("186") ? "" : (stryCov_9fa48("186"), "Some image upload failed"));
            }
          }
          apartment.imageURLs = uploadResults.map(stryMutAct_9fa48("187") ? () => undefined : (stryCov_9fa48("187"), result => result.value));
          if (stryMutAct_9fa48("189") ? false : stryMutAct_9fa48("188") ? true : (stryCov_9fa48("188", "189"), createApartmentDto.residentIds)) {
            if (stryMutAct_9fa48("190")) {
              {}
            } else {
              stryCov_9fa48("190");
              const residents = await this.residentRepository.find(stryMutAct_9fa48("191") ? {} : (stryCov_9fa48("191"), {
                where: stryMutAct_9fa48("192") ? {} : (stryCov_9fa48("192"), {
                  id: In(createApartmentDto.residentIds)
                })
              }));
              if (stryMutAct_9fa48("195") ? residents.length === createApartmentDto.residentIds.length : stryMutAct_9fa48("194") ? false : stryMutAct_9fa48("193") ? true : (stryCov_9fa48("193", "194", "195"), residents.length !== createApartmentDto.residentIds.length)) throw new NotFoundException(stryMutAct_9fa48("196") ? "" : (stryCov_9fa48("196"), "Some resident not found"));
              apartment.residents = residents;
            }
          }
          apartment = await this.apartmentRepository.save(apartment);
          await queryRunnder.commitTransaction();
          return apartment;
        }
      } catch (error) {
        if (stryMutAct_9fa48("197")) {
          {}
        } else {
          stryCov_9fa48("197");
          await queryRunnder.rollbackTransaction();
          await this.storageManager.remove(stryMutAct_9fa48("198") ? uploadResults.map(r => r.value) : (stryCov_9fa48("198"), uploadResults.filter(stryMutAct_9fa48("199") ? () => undefined : (stryCov_9fa48("199"), (r): r is PromiseFulfilledResult<string> => this.isPromiseFulfilledResult(r))).map(stryMutAct_9fa48("200") ? () => undefined : (stryCov_9fa48("200"), r => r.value))));
          console.error(error);
          throw error;
        }
      } finally {
        if (stryMutAct_9fa48("201")) {
          {}
        } else {
          stryCov_9fa48("201");
          await queryRunnder.release();
        }
      }
    }
  }
  async findAll(page?: number) {
    if (stryMutAct_9fa48("202")) {
      {}
    } else {
      stryCov_9fa48("202");
      if (stryMutAct_9fa48("205") ? page != undefined || page != null : stryMutAct_9fa48("204") ? false : stryMutAct_9fa48("203") ? true : (stryCov_9fa48("203", "204", "205"), (stryMutAct_9fa48("207") ? page == undefined : stryMutAct_9fa48("206") ? true : (stryCov_9fa48("206", "207"), page != undefined)) && (stryMutAct_9fa48("209") ? page == null : stryMutAct_9fa48("208") ? true : (stryCov_9fa48("208", "209"), page != null)))) {
        if (stryMutAct_9fa48("210")) {
          {}
        } else {
          stryCov_9fa48("210");
          return await this.apartmentRepository.find(stryMutAct_9fa48("211") ? {} : (stryCov_9fa48("211"), {
            skip: stryMutAct_9fa48("212") ? (page - 1) / 30 : (stryCov_9fa48("212"), (stryMutAct_9fa48("213") ? page + 1 : (stryCov_9fa48("213"), page - 1)) * 30),
            take: 30
          }));
        }
      }
      return await this.apartmentRepository.find();
    }
  }
  async findOne(id: string) {
    if (stryMutAct_9fa48("214")) {
      {}
    } else {
      stryCov_9fa48("214");
      return await this.apartmentRepository.findOne(stryMutAct_9fa48("215") ? {} : (stryCov_9fa48("215"), {
        where: stryMutAct_9fa48("216") ? {} : (stryCov_9fa48("216"), {
          apartment_id: id
        })
      }));
    }
  }
  async update(id: string, updateApartmentDto: UpdateApartmentDto): Promise<boolean> {
    if (stryMutAct_9fa48("217")) {
      {}
    } else {
      stryCov_9fa48("217");
      let uploadPaths: string[] = stryMutAct_9fa48("218") ? ["Stryker was here"] : (stryCov_9fa48("218"), []);
      const queryRunnder = this.dataSource.createQueryRunner();
      try {
        if (stryMutAct_9fa48("219")) {
          {}
        } else {
          stryCov_9fa48("219");
          queryRunnder.startTransaction();
          let {
            images,
            ...rest
          } = updateApartmentDto;
          let apartment = await this.apartmentRepository.preload(stryMutAct_9fa48("220") ? {} : (stryCov_9fa48("220"), {
            apartment_id: id,
            ...rest
          }));
          if (stryMutAct_9fa48("223") ? false : stryMutAct_9fa48("222") ? true : stryMutAct_9fa48("221") ? apartment : (stryCov_9fa48("221", "222", "223"), !apartment)) throw new NotFoundException(stryMutAct_9fa48("224") ? "" : (stryCov_9fa48("224"), "Apartment Not found"));
          if (stryMutAct_9fa48("226") ? false : stryMutAct_9fa48("225") ? true : (stryCov_9fa48("225", "226"), images)) {
            if (stryMutAct_9fa48("227")) {
              {}
            } else {
              stryCov_9fa48("227");
              if (stryMutAct_9fa48("229") ? false : stryMutAct_9fa48("228") ? true : (stryCov_9fa48("228", "229"), this.newImageHaveStrangeURL(images, apartment.imageURLs))) throw new BadRequestException(stryMutAct_9fa48("230") ? "" : (stryCov_9fa48("230"), "Detect strange URL"));
              const newImages = await Promise.allSettled(images.map((element, index) => {
                if (stryMutAct_9fa48("231")) {
                  {}
                } else {
                  stryCov_9fa48("231");
                  if (stryMutAct_9fa48("233") ? false : stryMutAct_9fa48("232") ? true : (stryCov_9fa48("232", "233"), isString(element))) return element;
                  const uploadPath = stryMutAct_9fa48("234") ? `` : (stryCov_9fa48("234"), `apartment/${id}/${stryMutAct_9fa48("235") ? index + Date.now() - (element.extension || ".png") : (stryCov_9fa48("235"), (stryMutAct_9fa48("236") ? index - Date.now() : (stryCov_9fa48("236"), index + Date.now())) + (stryMutAct_9fa48("239") ? element.extension && ".png" : stryMutAct_9fa48("238") ? false : stryMutAct_9fa48("237") ? true : (stryCov_9fa48("237", "238", "239"), element.extension || (stryMutAct_9fa48("240") ? "" : (stryCov_9fa48("240"), ".png")))))}`);
                  uploadPaths.push(uploadPath);
                  return this.storageManager.upload(element.buffer, uploadPath, stryMutAct_9fa48("243") ? `image/${element.extension}` && ".png" : stryMutAct_9fa48("242") ? false : stryMutAct_9fa48("241") ? true : (stryCov_9fa48("241", "242", "243"), (stryMutAct_9fa48("244") ? `` : (stryCov_9fa48("244"), `image/${element.extension}`)) || (stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), ".png"))));
                }
              }));
              if (stryMutAct_9fa48("248") ? false : stryMutAct_9fa48("247") ? true : stryMutAct_9fa48("246") ? this.isPromiseFulfilledResultArray(newImages) : (stryCov_9fa48("246", "247", "248"), !this.isPromiseFulfilledResultArray(newImages))) throw new StorageError(stryMutAct_9fa48("249") ? "" : (stryCov_9fa48("249"), "Some image upload failed"));
              const newImageURLS = newImages.map(stryMutAct_9fa48("250") ? () => undefined : (stryCov_9fa48("250"), result => result.value));
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
        if (stryMutAct_9fa48("251")) {
          {}
        } else {
          stryCov_9fa48("251");
          await queryRunnder.rollbackTransaction();
          if (stryMutAct_9fa48("255") ? uploadPaths.length <= 0 : stryMutAct_9fa48("254") ? uploadPaths.length >= 0 : stryMutAct_9fa48("253") ? false : stryMutAct_9fa48("252") ? true : (stryCov_9fa48("252", "253", "254", "255"), uploadPaths.length > 0)) await this.storageManager.remove(uploadPaths);
          console.error(error);
          throw error;
        }
      } finally {
        if (stryMutAct_9fa48("256")) {
          {}
        } else {
          stryCov_9fa48("256");
          await queryRunnder.release();
        }
      }
    }
  }
  private isPromiseFulfilledResult<T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> {
    if (stryMutAct_9fa48("257")) {
      {}
    } else {
      stryCov_9fa48("257");
      return stryMutAct_9fa48("260") ? result.status !== "fulfilled" : stryMutAct_9fa48("259") ? false : stryMutAct_9fa48("258") ? true : (stryCov_9fa48("258", "259", "260"), result.status === (stryMutAct_9fa48("261") ? "" : (stryCov_9fa48("261"), "fulfilled")));
    }
  }
  private isPromiseFulfilledResultArray<T>(results: PromiseSettledResult<T>[]): results is PromiseFulfilledResult<T>[] {
    if (stryMutAct_9fa48("262")) {
      {}
    } else {
      stryCov_9fa48("262");
      return stryMutAct_9fa48("263") ? results.some(result => result.status === "fulfilled") : (stryCov_9fa48("263"), results.every(stryMutAct_9fa48("264") ? () => undefined : (stryCov_9fa48("264"), result => stryMutAct_9fa48("267") ? result.status !== "fulfilled" : stryMutAct_9fa48("266") ? false : stryMutAct_9fa48("265") ? true : (stryCov_9fa48("265", "266", "267"), result.status === (stryMutAct_9fa48("268") ? "" : (stryCov_9fa48("268"), "fulfilled"))))));
    }
  }
  private newImageHaveStrangeURL(newImages: (string | MemoryStoredFile)[], oldImageURLS: string[]) {
    if (stryMutAct_9fa48("269")) {
      {}
    } else {
      stryCov_9fa48("269");
      const newImageURLS = stryMutAct_9fa48("270") ? newImages : (stryCov_9fa48("270"), newImages.filter(stryMutAct_9fa48("271") ? () => undefined : (stryCov_9fa48("271"), (image): image is string => isString(image))));
      if (stryMutAct_9fa48("275") ? difference(newImageURLS, oldImageURLS).length <= 0 : stryMutAct_9fa48("274") ? difference(newImageURLS, oldImageURLS).length >= 0 : stryMutAct_9fa48("273") ? false : stryMutAct_9fa48("272") ? true : (stryCov_9fa48("272", "273", "274", "275"), difference(newImageURLS, oldImageURLS).length > 0)) return stryMutAct_9fa48("276") ? false : (stryCov_9fa48("276"), true);
      return stryMutAct_9fa48("277") ? true : (stryCov_9fa48("277"), false);
    }
  }
  async delete(id: string) {
    if (stryMutAct_9fa48("278")) {
      {}
    } else {
      stryCov_9fa48("278");
      return await this.apartmentRepository.softDelete(stryMutAct_9fa48("279") ? {} : (stryCov_9fa48("279"), {
        apartment_id: id
      }));
    }
  }
}
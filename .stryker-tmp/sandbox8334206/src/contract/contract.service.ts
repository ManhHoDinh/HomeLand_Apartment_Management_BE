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
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { DataSource, Repository, TypeORMError } from "typeorm";
import { Contract } from "./entities/contract.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { isQueryAffected } from "../helper/validation";
import { IdGenerator } from "../id-generator/id-generator.service";
import { StorageManager } from "../storage/storage.service";
@Injectable()
export class ContractService {
  constructor(@InjectRepository(Contract)
  private contractRepository: Repository<Contract>, @InjectDataSource()
  private dataSource: DataSource, private storageManager: StorageManager, private readonly idGenerate: IdGenerator) {}
  async create(createContract: CreateContractDto, id?: string) {
    if (stryMutAct_9fa48("949")) {
      {}
    } else {
      stryCov_9fa48("949");
      const {
        ...rest
      } = createContract;
      let contract = this.contractRepository.create(rest);
      console.log(contract);
      contract.contract_id = (stryMutAct_9fa48("950") ? "" : (stryCov_9fa48("950"), "CT")) + this.idGenerate.generateId().toString();
      if (stryMutAct_9fa48("952") ? false : stryMutAct_9fa48("951") ? true : (stryCov_9fa48("951", "952"), id)) contract.contract_id = id;
      return await this.contractRepository.save(contract);
      //await this.findOne(contract.contract_id);
    }
  }

  async findAll(page?: number) {
    if (stryMutAct_9fa48("953")) {
      {}
    } else {
      stryCov_9fa48("953");
      if (stryMutAct_9fa48("956") ? page != undefined && page != null || page > 0 : stryMutAct_9fa48("955") ? false : stryMutAct_9fa48("954") ? true : (stryCov_9fa48("954", "955", "956"), (stryMutAct_9fa48("958") ? page != undefined || page != null : stryMutAct_9fa48("957") ? true : (stryCov_9fa48("957", "958"), (stryMutAct_9fa48("960") ? page == undefined : stryMutAct_9fa48("959") ? true : (stryCov_9fa48("959", "960"), page != undefined)) && (stryMutAct_9fa48("962") ? page == null : stryMutAct_9fa48("961") ? true : (stryCov_9fa48("961", "962"), page != null)))) && (stryMutAct_9fa48("965") ? page <= 0 : stryMutAct_9fa48("964") ? page >= 0 : stryMutAct_9fa48("963") ? true : (stryCov_9fa48("963", "964", "965"), page > 0)))) {
        if (stryMutAct_9fa48("966")) {
          {}
        } else {
          stryCov_9fa48("966");
          return await this.contractRepository.find(stryMutAct_9fa48("967") ? {} : (stryCov_9fa48("967"), {
            skip: stryMutAct_9fa48("968") ? (page - 1) / 30 : (stryCov_9fa48("968"), (stryMutAct_9fa48("969") ? page + 1 : (stryCov_9fa48("969"), page - 1)) * 30),
            take: 30,
            relations: stryMutAct_9fa48("970") ? [] : (stryCov_9fa48("970"), [stryMutAct_9fa48("971") ? "" : (stryCov_9fa48("971"), "resident"), stryMutAct_9fa48("972") ? "" : (stryCov_9fa48("972"), "apartment")]),
            cache: stryMutAct_9fa48("973") ? false : (stryCov_9fa48("973"), true)
          }));
        }
      }
      return await this.contractRepository.find(stryMutAct_9fa48("974") ? {} : (stryCov_9fa48("974"), {
        relations: stryMutAct_9fa48("975") ? [] : (stryCov_9fa48("975"), [stryMutAct_9fa48("976") ? "" : (stryCov_9fa48("976"), "resident"), stryMutAct_9fa48("977") ? "" : (stryCov_9fa48("977"), "apartment")]),
        cache: stryMutAct_9fa48("978") ? false : (stryCov_9fa48("978"), true)
      }));
    }
  }
  async findOne(id: string): Promise<Contract> {
    if (stryMutAct_9fa48("979")) {
      {}
    } else {
      stryCov_9fa48("979");
      let contract = await this.contractRepository.findOne(stryMutAct_9fa48("980") ? {} : (stryCov_9fa48("980"), {
        where: stryMutAct_9fa48("981") ? {} : (stryCov_9fa48("981"), {
          contract_id: id
        }),
        cache: stryMutAct_9fa48("982") ? false : (stryCov_9fa48("982"), true),
        relations: stryMutAct_9fa48("983") ? [] : (stryCov_9fa48("983"), [stryMutAct_9fa48("984") ? "" : (stryCov_9fa48("984"), "resident"), stryMutAct_9fa48("985") ? "" : (stryCov_9fa48("985"), "apartment")])
      }));
      if (stryMutAct_9fa48("988") ? contract != null : stryMutAct_9fa48("987") ? false : stryMutAct_9fa48("986") ? true : (stryCov_9fa48("986", "987", "988"), contract == null)) throw new NotFoundException();
      return contract;
    }
  }
  async update(id: string, updateContractDto: UpdateContractDto) {
    if (stryMutAct_9fa48("989")) {
      {}
    } else {
      stryCov_9fa48("989");
      const {
        imageUpdate,
        ...rest
      } = updateContractDto;
      let contract = this.contractRepository.create(rest);
      const queryRunner = this.dataSource.createQueryRunner();
      if (stryMutAct_9fa48("991") ? false : stryMutAct_9fa48("990") ? true : (stryCov_9fa48("990", "991"), imageUpdate)) {
        if (stryMutAct_9fa48("992")) {
          {}
        } else {
          stryCov_9fa48("992");
          try {
            if (stryMutAct_9fa48("993")) {
              {}
            } else {
              stryCov_9fa48("993");
              await queryRunner.connect();
              await queryRunner.startTransaction();
              const imageURL = await this.storageManager.upload(imageUpdate.buffer, stryMutAct_9fa48("994") ? `` : (stryCov_9fa48("994"), `contract/${id}/${Date.now()}.png`), stryMutAct_9fa48("995") ? "" : (stryCov_9fa48("995"), "image/png"));
              contract.contract_id = id;
              contract.contract_with_signature_photo_URL = imageURL;
              contract = await this.contractRepository.save(contract);
              await queryRunner.commitTransaction();
            }
          } catch (error) {
            if (stryMutAct_9fa48("996")) {
              {}
            } else {
              stryCov_9fa48("996");
              if (stryMutAct_9fa48("998") ? false : stryMutAct_9fa48("997") ? true : (stryCov_9fa48("997", "998"), error instanceof TypeORMError)) {
                if (stryMutAct_9fa48("999")) {
                  {}
                } else {
                  stryCov_9fa48("999");
                  try {
                    if (stryMutAct_9fa48("1000")) {
                      {}
                    } else {
                      stryCov_9fa48("1000");
                      await this.storageManager.remove(stryMutAct_9fa48("1001") ? [] : (stryCov_9fa48("1001"), [(stryMutAct_9fa48("1002") ? `` : (stryCov_9fa48("1002"), `contract/${id}/${Date.now()}.`)) + (stryMutAct_9fa48("1005") ? imageUpdate.extension && "png" : stryMutAct_9fa48("1004") ? false : stryMutAct_9fa48("1003") ? true : (stryCov_9fa48("1003", "1004", "1005"), imageUpdate.extension || (stryMutAct_9fa48("1006") ? "" : (stryCov_9fa48("1006"), "png")))), stryMutAct_9fa48("1009") ? imageUpdate.mimetype && "image/png" : stryMutAct_9fa48("1008") ? false : stryMutAct_9fa48("1007") ? true : (stryCov_9fa48("1007", "1008", "1009"), imageUpdate.mimetype || (stryMutAct_9fa48("1010") ? "" : (stryCov_9fa48("1010"), "image/png")))]));
                    }
                  } catch (error) {
                    if (stryMutAct_9fa48("1011")) {
                      {}
                    } else {
                      stryCov_9fa48("1011");
                      console.error(error);
                    }
                  }
                }
              }
              throw error;
            }
          } finally {
            if (stryMutAct_9fa48("1012")) {
              {}
            } else {
              stryCov_9fa48("1012");
              await queryRunner.release();
            }
          }
        }
      }
      let result = await this.contractRepository.update(stryMutAct_9fa48("1013") ? {} : (stryCov_9fa48("1013"), {
        contract_id: id
      }), stryMutAct_9fa48("1014") ? {} : (stryCov_9fa48("1014"), {
        ...contract
      }));
      return await isQueryAffected(result);
    }
  }
  async remove(id: string) {
    if (stryMutAct_9fa48("1015")) {
      {}
    } else {
      stryCov_9fa48("1015");
      return await this.contractRepository.softDelete(stryMutAct_9fa48("1016") ? {} : (stryCov_9fa48("1016"), {
        contract_id: id
      }));
    }
  }
}
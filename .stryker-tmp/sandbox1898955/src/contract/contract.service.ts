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
    if (stryMutAct_9fa48("335")) {
      {}
    } else {
      stryCov_9fa48("335");
      const {
        ...rest
      } = createContract;
      let contract = this.contractRepository.create(rest);
      console.log(contract);
      contract.contract_id = (stryMutAct_9fa48("336") ? "" : (stryCov_9fa48("336"), "CT")) + this.idGenerate.generateId().toString();
      if (stryMutAct_9fa48("338") ? false : stryMutAct_9fa48("337") ? true : (stryCov_9fa48("337", "338"), id)) contract.contract_id = id;
      return await this.contractRepository.save(contract);
      //await this.findOne(contract.contract_id);
    }
  }

  async findAll(page?: number) {
    if (stryMutAct_9fa48("339")) {
      {}
    } else {
      stryCov_9fa48("339");
      if (stryMutAct_9fa48("342") ? page != undefined && page != null || page > 0 : stryMutAct_9fa48("341") ? false : stryMutAct_9fa48("340") ? true : (stryCov_9fa48("340", "341", "342"), (stryMutAct_9fa48("344") ? page != undefined || page != null : stryMutAct_9fa48("343") ? true : (stryCov_9fa48("343", "344"), (stryMutAct_9fa48("346") ? page == undefined : stryMutAct_9fa48("345") ? true : (stryCov_9fa48("345", "346"), page != undefined)) && (stryMutAct_9fa48("348") ? page == null : stryMutAct_9fa48("347") ? true : (stryCov_9fa48("347", "348"), page != null)))) && (stryMutAct_9fa48("351") ? page <= 0 : stryMutAct_9fa48("350") ? page >= 0 : stryMutAct_9fa48("349") ? true : (stryCov_9fa48("349", "350", "351"), page > 0)))) {
        if (stryMutAct_9fa48("352")) {
          {}
        } else {
          stryCov_9fa48("352");
          return await this.contractRepository.find(stryMutAct_9fa48("353") ? {} : (stryCov_9fa48("353"), {
            skip: stryMutAct_9fa48("354") ? (page - 1) / 30 : (stryCov_9fa48("354"), (stryMutAct_9fa48("355") ? page + 1 : (stryCov_9fa48("355"), page - 1)) * 30),
            take: 30,
            relations: stryMutAct_9fa48("356") ? [] : (stryCov_9fa48("356"), [stryMutAct_9fa48("357") ? "" : (stryCov_9fa48("357"), "resident"), stryMutAct_9fa48("358") ? "" : (stryCov_9fa48("358"), "apartment")]),
            cache: stryMutAct_9fa48("359") ? false : (stryCov_9fa48("359"), true)
          }));
        }
      }
      return await this.contractRepository.find(stryMutAct_9fa48("360") ? {} : (stryCov_9fa48("360"), {
        relations: stryMutAct_9fa48("361") ? [] : (stryCov_9fa48("361"), [stryMutAct_9fa48("362") ? "" : (stryCov_9fa48("362"), "resident"), stryMutAct_9fa48("363") ? "" : (stryCov_9fa48("363"), "apartment")]),
        cache: stryMutAct_9fa48("364") ? false : (stryCov_9fa48("364"), true)
      }));
    }
  }
  async findOne(id: string): Promise<Contract> {
    if (stryMutAct_9fa48("365")) {
      {}
    } else {
      stryCov_9fa48("365");
      let contract = await this.contractRepository.findOne(stryMutAct_9fa48("366") ? {} : (stryCov_9fa48("366"), {
        where: stryMutAct_9fa48("367") ? {} : (stryCov_9fa48("367"), {
          contract_id: id
        }),
        cache: stryMutAct_9fa48("368") ? false : (stryCov_9fa48("368"), true),
        relations: stryMutAct_9fa48("369") ? [] : (stryCov_9fa48("369"), [stryMutAct_9fa48("370") ? "" : (stryCov_9fa48("370"), "resident"), stryMutAct_9fa48("371") ? "" : (stryCov_9fa48("371"), "apartment")])
      }));
      if (stryMutAct_9fa48("374") ? contract != null : stryMutAct_9fa48("373") ? false : stryMutAct_9fa48("372") ? true : (stryCov_9fa48("372", "373", "374"), contract == null)) throw new NotFoundException();
      return contract;
    }
  }
  async update(id: string, updateContractDto: UpdateContractDto) {
    if (stryMutAct_9fa48("375")) {
      {}
    } else {
      stryCov_9fa48("375");
      const {
        imageUpdate,
        ...rest
      } = updateContractDto;
      let contract = this.contractRepository.create(rest);
      const queryRunner = this.dataSource.createQueryRunner();
      if (stryMutAct_9fa48("377") ? false : stryMutAct_9fa48("376") ? true : (stryCov_9fa48("376", "377"), imageUpdate)) {
        if (stryMutAct_9fa48("378")) {
          {}
        } else {
          stryCov_9fa48("378");
          try {
            if (stryMutAct_9fa48("379")) {
              {}
            } else {
              stryCov_9fa48("379");
              await queryRunner.connect();
              await queryRunner.startTransaction();
              const imageURL = await this.storageManager.upload(imageUpdate.buffer, stryMutAct_9fa48("380") ? `` : (stryCov_9fa48("380"), `contract/${id}/${Date.now()}.png`), stryMutAct_9fa48("381") ? "" : (stryCov_9fa48("381"), "image/png"));
              contract.contract_id = id;
              contract.contract_with_signature_photo_URL = imageURL;
              contract = await this.contractRepository.save(contract);
              await queryRunner.commitTransaction();
            }
          } catch (error) {
            if (stryMutAct_9fa48("382")) {
              {}
            } else {
              stryCov_9fa48("382");
              if (stryMutAct_9fa48("384") ? false : stryMutAct_9fa48("383") ? true : (stryCov_9fa48("383", "384"), error instanceof TypeORMError)) {
                if (stryMutAct_9fa48("385")) {
                  {}
                } else {
                  stryCov_9fa48("385");
                  try {
                    if (stryMutAct_9fa48("386")) {
                      {}
                    } else {
                      stryCov_9fa48("386");
                      await this.storageManager.remove(stryMutAct_9fa48("387") ? [] : (stryCov_9fa48("387"), [(stryMutAct_9fa48("388") ? `` : (stryCov_9fa48("388"), `contract/${id}/${Date.now()}.`)) + (stryMutAct_9fa48("391") ? imageUpdate.extension && "png" : stryMutAct_9fa48("390") ? false : stryMutAct_9fa48("389") ? true : (stryCov_9fa48("389", "390", "391"), imageUpdate.extension || (stryMutAct_9fa48("392") ? "" : (stryCov_9fa48("392"), "png")))), stryMutAct_9fa48("395") ? imageUpdate.mimetype && "image/png" : stryMutAct_9fa48("394") ? false : stryMutAct_9fa48("393") ? true : (stryCov_9fa48("393", "394", "395"), imageUpdate.mimetype || (stryMutAct_9fa48("396") ? "" : (stryCov_9fa48("396"), "image/png")))]));
                    }
                  } catch (error) {
                    if (stryMutAct_9fa48("397")) {
                      {}
                    } else {
                      stryCov_9fa48("397");
                      console.error(error);
                    }
                  }
                }
              }
              throw error;
            }
          } finally {
            if (stryMutAct_9fa48("398")) {
              {}
            } else {
              stryCov_9fa48("398");
              await queryRunner.release();
            }
          }
        }
      }
      let result = await this.contractRepository.update(stryMutAct_9fa48("399") ? {} : (stryCov_9fa48("399"), {
        contract_id: id
      }), stryMutAct_9fa48("400") ? {} : (stryCov_9fa48("400"), {
        ...contract
      }));
      return await isQueryAffected(result);
    }
  }
  async remove(id: string) {
    if (stryMutAct_9fa48("401")) {
      {}
    } else {
      stryCov_9fa48("401");
      return await this.contractRepository.softDelete(stryMutAct_9fa48("402") ? {} : (stryCov_9fa48("402"), {
        contract_id: id
      }));
    }
  }
}
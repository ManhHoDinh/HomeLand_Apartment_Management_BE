import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { Repository } from "typeorm";
import { Contract } from "./entities/contract.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { isQueryAffected } from "src/helper/validation";

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
    ) {}
    async create(createContract: CreateContractDto) {
        return await this.contractRepository.save(createContract);
    }

    async findAll() {
        return await this.contractRepository.find({
            relations: ["resident", "apartment"],
        });
    }

    async findOne(id: string): Promise<Contract> {
        let contract = await this.contractRepository.findOne({
            where: {
                contract_id: id,
            },
            cache: true,
            relations: ["resident", "apartment"],
        });
        if (contract == null) throw new NotFoundException();
        return contract;
    }

    async update(id: string, updateContractDto: UpdateContractDto) {
        let result = await this.contractRepository.update(
            { contract_id: id },
            { ...updateContractDto },
        );
        return await isQueryAffected(result);
    }

    async remove(id: string) {
        return await this.contractRepository.softDelete({
            contract_id: id,
        });
    }
}

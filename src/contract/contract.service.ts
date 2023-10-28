import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { Repository } from "typeorm";
import { Contract } from "./entities/contract.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
    ) {}
    create(createContract: CreateContractDto) {
        return this.contractRepository.save(createContract);
    }

    findAll() {
        return this.contractRepository.find({
            relations: ["resident", "apartment"],
        });
    }

    async findOne(id: number): Promise<Contract> {
        let contract = await this.contractRepository.findOne({
            where: {
                contract_id: id.toString(),
            },
            cache: true,
            relations: ["resident", "apartment"],
        });
        if (contract == null) throw new NotFoundException();
        return contract;
    }

    update(id: number, updateContractDto: UpdateContractDto) {
        return this.contractRepository.update(
            { contract_id: id.toString() },
            { ...updateContractDto },
        );
    }

    remove(id: number) {
        return this.contractRepository.delete({ contract_id: id.toString() });
    }
}

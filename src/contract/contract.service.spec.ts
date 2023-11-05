import { Test, TestingModule } from "@nestjs/testing";
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { Contract } from "./entities/contract.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";

describe("ContractService", () => {
    let service: ContractService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(), // Include your TypeORM configuration
                TypeOrmModule.forFeature([Contract]),
                AuthModule,
                StorageModule,
                IdGeneratorModule,
            ],

            providers: [ContractService],
        }).compile();

        service = module.get<ContractService>(ContractService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

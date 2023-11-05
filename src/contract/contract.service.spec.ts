import { Test, TestingModule } from "@nestjs/testing";
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { Contract } from "./entities/contract.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";

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
                JwtModule,
            ],

            providers: [ContractService, JwtService],
        }).compile();

        service = module.get<ContractService>(ContractService);
    }, 30000);

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

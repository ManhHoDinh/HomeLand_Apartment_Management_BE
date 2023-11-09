import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { ContractRole, ContractStatusRole } from "../helper/enums/contractEnum";
import { readFileSync } from "fs";
import { NotFoundException } from "@nestjs/common";
import { DatetimeGenerator, IdGenerator } from "./id-generator.service";

describe("IdGenerator", () => {
    let service: IdGenerator;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: IdGenerator,
                    useClass: DatetimeGenerator,
                },
            ],
        }).compile();
        
        service = module.get<IdGenerator>(IdGenerator);
    }, 30000);

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("should generate id", () => {

        const id = service.generateId();
        expect(id).toBeDefined();   
    });
});

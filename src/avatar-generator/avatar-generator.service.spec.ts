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
import { DiceBearAvatarGenerator } from "./avatar-generator.service";
const mockAvatar = {} as ArrayBuffer;

describe("AvatarService", () => {
    let service: DiceBearAvatarGenerator;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DiceBearAvatarGenerator],
        }).compile();
        service = module.get<DiceBearAvatarGenerator>(DiceBearAvatarGenerator);
    }, 30000);

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("should initialize createAvatar and collection onModuleInit", async () => {
        jest.spyOn(service, "onModuleInit").mockImplementation();
        await service.onModuleInit();

        expect(service.onModuleInit).toBeCalled();
    });
    it("should be generateAvatar", async () => {
        jest.spyOn(service, "generateAvatar").mockImplementation(() =>
            Promise.resolve(mockAvatar),
        );

        expect(service.generateAvatar("testSeed")).resolves.toEqual(mockAvatar);
    });
});

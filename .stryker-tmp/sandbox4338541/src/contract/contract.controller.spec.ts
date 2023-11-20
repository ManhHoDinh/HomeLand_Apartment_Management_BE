// @ts-nocheck
import { Test, TestingModule } from "@nestjs/testing";
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { Contract } from "./entities/contract.entity";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { ContractRole, ContractStatusRole } from "../helper/enums/contractEnum";
import { CreateContractDto } from "./dto/create-contract.dto";
import { readFileSync } from "fs";
import { UpdateContractDto } from "./dto/update-contract.dto";

describe("ContractService", () => {
    let service: ContractService;
    let controller: ContractController;

    const mockDeleteResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
    };
    const mockContract = {
        contract_id: "CT001",
        apartment_id: "123",
        resident_id: "123",
        role: ContractRole.RENT,
        status: ContractStatusRole.INACTIVE,
        expire_at: new Date("2030-01-01"),
    } as Contract;
    function findAllResult(page?: Number, total?: Number) {
        return {
            current_page: page,
            data: mockContract,
            per_page: 30,
            total: total,
        };
    }
    const mockUpdateResult = [
        { msg: "Contract updated" },
        {
            apartment_id: mockContract.apartment_id,
            contract_id: mockContract.contract_id,
            expire_at: mockContract.expire_at,
            resident_id: mockContract.resident_id,
            role: mockContract.role,
            status: mockContract.status,
        },
    ];
    const image = {
        buffer: readFileSync(process.cwd() + "/src/seed/room.jpg"),
    } as MemoryStoredFile;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                NestjsFormDataModule.config({
                    isGlobal: true,
                }),

                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        if (process.env.IS_PRODUCTION == "true") {
                            return {
                                type: "postgres",
                                url: process.env.DB_URL,
                                synchronize: true,
                                entities: ["dist/**/*.entity{.ts,.js}"],
                                cache: {
                                    duration: 5000,
                                    type: "redis",
                                    options: {
                                        url: process.env.REDIS_URL,
                                    },
                                },
                            };
                        } else {
                            return {
                                type: "postgres",
                                url: process.env.DB_LOCAL_URL,
                                synchronize: true,
                                entities: ["dist/**/*.entity{.ts,.js}"],
                                duration: 5000,
                                cache: {
                                    type: "redis",
                                    options: {
                                        url: process.env.REDIS_LOCAL_URL,
                                    },
                                },
                            };
                        }
                    },
                }),
                TypeOrmModule.forFeature([Contract]),
                AuthModule,
                StorageModule,
                IdGeneratorModule,
                JwtModule,
                Repository<Contract>,
            ],
            controllers: [ContractController],

            providers: [
                ContractService,
                {
                    provide: ContractService,
                    useValue: {
                        create: jest
                            .fn()
                            .mockImplementation(() => mockContract),
                        findOne: jest
                            .fn()
                            .mockImplementation(async () => mockContract),
                        findAll: jest
                            .fn()
                            .mockImplementation(async () => mockContract),
                        update: jest.fn().mockImplementation(async () => {
                            return mockUpdateResult;
                        }),
                        remove: jest.fn().mockImplementation(async () => {
                            return mockDeleteResult;
                        }),
                    },
                },
                JwtService,
            ],
        }).compile();
        controller = module.get<ContractController>(ContractController);
        service = module.get<ContractService>(ContractService);
    }, 30000);

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("get Contracts", () => {
        it("should find contract by id", async () => {
            const result = await controller.findOne(mockContract.contract_id);
            expect(result).toEqual(mockContract);
            expect(service.findOne).toHaveBeenCalledWith(
                mockContract.contract_id,
            );
        });

        it("should find all contract", async () => {
            const result = await controller.findAll();
            expect(result).toEqual(findAllResult());
        });
        it("should find all contract with page", async () => {
            const result = await controller.findAll(1);
            expect(result).toEqual(findAllResult(1));
            expect(service.findAll).toHaveBeenCalledWith(1);
        });
    });
    describe("create contract", () => {
        it("should create new Contract success", async () => {
            const result = await controller.create({
                apartment_id: mockContract.apartment_id,
                resident_id: mockContract.resident_id,
                expire_at: mockContract.expire_at,
                role: mockContract.role,
                status: mockContract.status,
            } as CreateContractDto);
            expect(result).toEqual({
                contract_id: expect.any(String),
                apartment_id: mockContract.apartment_id,
                resident_id: mockContract.resident_id,
                expire_at: mockContract.expire_at,
                role: mockContract.role,
                status: mockContract.status,
            });
            expect(service.create).toHaveBeenCalled();
        });

        it("should create new contract fail", async () => {
            try {
                const result = await controller.create({
                    apartment_id: mockContract.apartment_id,
                    resident_id: mockContract.resident_id,
                    expire_at: mockContract.expire_at,
                    role: mockContract.role,
                    status: mockContract.status,
                } as CreateContractDto);
            } catch (err) {
                expect(err.message).toBe(
                    'No metadata for "Contract" was found.',
                );
            }
        });
    });
    describe("Update contract", () => {
        it("should update Contract success", async () => {
            const result = await controller.update(
                mockContract.contract_id,
                mockContract as CreateContractDto,
            );
            expect(result).toEqual(mockUpdateResult);
        });
        it("should update Contract success with image", async () => {
            const result = await controller.update(mockContract.contract_id, {
                imageUpdate: image,
                ...mockContract,
            } as UpdateContractDto);
            expect(result).toEqual(mockUpdateResult);
        },30000);
        it("should update Contract success with invalid id", async () => {
            try {
                const result = await controller.update("in-val", {
                    imageUpdate: image,
                    ...mockContract,
                } as UpdateContractDto);
            } catch (err) {
                expect(err.message).toBe("Contract not found");
            }
        });
    });
    describe("Delete contract", () => {
        it("should delete Contract success", async () => {
            const result = await controller.remove(mockContract.contract_id);
            expect(result).toEqual(mockDeleteResult);
        });
    });
});

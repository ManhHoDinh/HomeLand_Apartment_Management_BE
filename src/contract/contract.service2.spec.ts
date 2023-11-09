import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ContractService } from "./contract.service";
import { Contract } from "./entities/contract.entity";
import { StorageModule } from "../storage/storage.module";
import { IdGenerator } from "../id-generator/id-generator.service";
import { AppModule } from "../app.module";
import { AuthModule } from "../auth/auth.module";
import { IdGeneratorModule } from "../id-generator/id-generator.module";

const userArray = [
    {
        firstName: "firstName #1",
        lastName: "lastName #1",
    },
    {
        firstName: "firstName #2",
        lastName: "lastName #2",
    },
];

const oneUser = {
    firstName: "firstName #1",
    lastName: "lastName #1",
};

describe("UserService", () => {
    let service: ContractService;
    let repository: Repository<Contract>;
    let dataSource: DataSource;
    let idGenerate: IdGenerator;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([Contract]),
                StorageModule,
                AppModule,
            ],
            providers: [
                ContractService,
                {
                    provide: getRepositoryToken(Contract),
                    useValue: {
                        find: jest.fn().mockResolvedValue(userArray),
                        findOneBy: jest.fn().mockResolvedValue(oneUser),
                        save: jest.fn().mockResolvedValue(oneUser),
                        remove: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: DataSource,
                    useValue: {
                        dataSource,
                    },
                },
                {
                    provide: IdGenerator,
                    useValue: {
                        idGenerate,
                    },
                },
            ],
        }).compile();
        service = module.get<ContractService>(ContractService);
        repository = module.get<Repository<Contract>>(
            getRepositoryToken(Contract),
        );
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    //   describe('create()', () => {
    //     it('should successfully insert a user', () => {
    //       const oneUser = {
    //         firstName: 'firstName #1',
    //         lastName: 'lastName #1',
    //       };

    //       expect(
    //         service.create({
    //           firstName: 'firstName #1',
    //           lastName: 'lastName #1',
    //         }),
    //       ).resolves.toEqual(oneUser);
    //     });
    //   });

    describe("findAll()", () => {
        it("should return an array of users", async () => {
            const users = await service.findAll();

            console.log(await repository.find());

            console.log(users);
            expect(users).toEqual(userArray);
        });
    });

    //   describe('findOne()', () => {
    //     it('should get a single user', () => {
    //       const repoSpy = jest.spyOn(repository, 'findOneBy');
    //       expect(service.findOne(1)).resolves.toEqual(oneUser);
    //       expect(repoSpy).toBeCalledWith({ id: 1 });
    //     });
    //   });

    describe("remove()", () => {
        it("should call remove with the passed value", async () => {
            const removeSpy = jest.spyOn(repository, "delete");
            const retVal = await service.remove("2");
            expect(removeSpy).toBeCalledWith("2");
            expect(retVal).toBeUndefined();
        });
    });
});

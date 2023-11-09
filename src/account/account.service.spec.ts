import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { request } from 'http';
import { Account } from './entities/account.entity';

describe('AccountService', () => {
  let service: AccountService;
  const mockAccount = {
    owner_id: "RES",
    email: "resident@gmail.com",
    password: "password",
  } as Account;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe("account", () => {
    it("should find account by id", () => {

        const result = service.findOne(mockAccount.owner_id);
       
        expect(result).toEqual("This action returns a #RES account");
    });
    it("should find all account", () => {
        const result = service.findAll();
        expect(result).toBe(`This action returns all account`);

    });
    it("should create new account", () => {
        const result = service.create({
          email: "resident@gmail.com",
  password: "password",
        });
        expect(result).toBe("This action adds a new account");
    });
    
    it("should delete success account", async () => {
        const result = service.remove("RES");
        expect(result).toBe("This action removes a #RES account");
    });
  
})
});

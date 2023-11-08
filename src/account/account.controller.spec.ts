import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

describe('AccountController', () => {
  let controller: AccountController;
  
const mockAccount = {
  owner_id: "RES",
  email: "resident@gmail.com",
  password: "password",
} as Account;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe("account", () => {
    it("should find account by id", () => {
        const result = controller.findOne(mockAccount.owner_id);
       
        expect(result).toEqual("This action returns a #RES account");
    });
    it("should find all account", () => {
        const result = controller.findAll();
        expect(result).toBe(`This action returns all account`);

    });
    it("should create new account", async () => {
        const result = controller.create({
          email: "resident@gmail.com",
  password: "password",
        });
        expect(result).toBe("This action adds a new account");
    });
    
    it("should delete success account", async () => {
        const result = controller.remove("RES");
        expect(result).toBe("This action removes a #RES account");
    });
   
});
});

// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService, AuthServiceImp } from './auth.service';
import { JWTAuthGuard } from './guard/jwt-auth.guard';
import { AuthModule } from './auth.module';
describe('AuthController', () => {
  let controller: AuthController;
const mockAuth = {
  owner_id: "RES",
  email: "resident@gmail.com",
  password: "password",
} ;
const mockAuthService = {
    signIn: jest.fn().mockImplementation(async(dto) => {
        return {
            access_token: "abc",
            role: "binh"
        }
    }),
   
};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceImp],
    }).overrideProvider(AuthServiceImp)
    .useValue(mockAuthService)

    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe("account", () => {
    it("should sign in", async() => {
    
        const result = await controller.login({
            email: 'abc@gmail.com',
            password: "abc"
        });
       
        expect(result).toEqual({
            access_token: "abc",
            role: "binh"
        });
    });

});
});

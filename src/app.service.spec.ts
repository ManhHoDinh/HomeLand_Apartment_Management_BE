import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('App service', () => {
  let service: AppService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  },30000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe("App service", () => {
    it("should find account by id", () => {
        // jest.spyOn(service, "getHello").mockImplementation(() => "Hello World!")
        const result = service.getHello();
        expect(result).toBe("Hello World!");
    });
  
});
});

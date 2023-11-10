import { Test, TestingModule } from '@nestjs/testing';
import { ServicePackageController } from './service-package.controller';
import { ServicePackageService } from './service-package.service';

describe('ServicePackageController', () => {
  let controller: ServicePackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicePackageController],
      providers: [ServicePackageService],
    }).compile();

    controller = module.get<ServicePackageController>(ServicePackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

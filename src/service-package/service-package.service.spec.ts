import { Test, TestingModule } from '@nestjs/testing';
import { ServicePackageService } from './service-package.service';

describe('ServicePackageService', () => {
  let service: ServicePackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicePackageService],
    }).compile();

    service = module.get<ServicePackageService>(ServicePackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

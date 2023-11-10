import { Module } from '@nestjs/common';
import { ServicePackageService } from './service-package.service';
import { ServicePackageController } from './service-package.controller';

@Module({
  controllers: [ServicePackageController],
  providers: [ServicePackageService],
})
export class ServicePackageModule {}

import { PartialType } from '@nestjs/swagger';
import { CreateServicePackageDto } from './create-service-package.dto';

export class UpdateServicePackageDto extends PartialType(CreateServicePackageDto) {}

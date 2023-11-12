import { Injectable } from '@nestjs/common';
import { CreateServicePackageDto } from './dto/create-service-package.dto';
import { UpdateServicePackageDto } from './dto/update-service-package.dto';

@Injectable()
export class ServicePackageService {
  create(createServicePackageDto: CreateServicePackageDto) {
    return 'This action adds a new servicePackage';
  }

  findAll() {
    return `This action returns all servicePackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicePackage`;
  }

  update(id: number, updateServicePackageDto: UpdateServicePackageDto) {
    return `This action updates a #${id} servicePackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicePackage`;
  }
}

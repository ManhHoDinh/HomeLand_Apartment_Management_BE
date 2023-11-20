// @ts-nocheck
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { StorageModule } from "../storage/storage.module";
import { HashModule } from "../hash/hash.module";
import { AvatarGeneratorModule } from "../avatar-generator/avatar-generator.module";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository, EmployeeService } from "./employee.service";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Employee]), IdGeneratorModule, StorageModule, HashModule, AvatarGeneratorModule, AuthModule],
  controllers: [EmployeeController],
  providers: [{
    provide: EmployeeRepository,
    useClass: EmployeeService
  }, JwtService],
  exports: [EmployeeRepository]
})
export class EmployeeModule {}
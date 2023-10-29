import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from './entities/contract.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([Contract]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}

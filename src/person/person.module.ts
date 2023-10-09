import { Module } from '@nestjs/common';
import { PersonRepository, PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { IdGeneratorModule } from '../id_generator/id_generator.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    IdGeneratorModule,
    NestjsFormDataModule,
    UploadModule,
  ],
  controllers: [PersonController],
  providers: [
    {
      provide: PersonRepository,
      useClass: PersonService,
    },
  ],
  exports: [PersonRepository],
})
export class PersonModule {}

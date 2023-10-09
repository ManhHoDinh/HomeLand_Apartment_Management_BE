import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ApartmentModule } from './apartment/apartment.module';
import { PersonModule } from './person/person.module';
import { IdGeneratorModule } from './id_generator/id_generator.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL || 'postgres://postgres@localhost:5432/db',
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      // cache: {
      //   type: 'redis',
      // }
    }),
    AuthModule,
    ApartmentModule,
    PersonModule,
    IdGeneratorModule,
    NestjsFormDataModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ApartmentModule } from './apartment/apartment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    ApartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

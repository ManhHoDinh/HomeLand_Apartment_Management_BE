import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PersonModule } from '../person/person.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PersonModule, JwtModule.register({})],
  controllers: [AuthController],
})
export class AuthModule {}

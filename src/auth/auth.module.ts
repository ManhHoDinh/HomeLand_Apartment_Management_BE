import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { HashModule } from "../hash/hash.module";
import { AuthService, AuthServiceImp } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "../account/entities/account.entity";
import { JWTAuthGuard } from "./guard/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [HashModule, TypeOrmModule.forFeature([Account])],
    providers: [
       
             AuthServiceImp,
        
        JWTAuthGuard,
        JwtService
    ],
    controllers: [AuthController],
    exports: [JWTAuthGuard, AuthModule, AuthServiceImp],
})
export class AuthModule {}

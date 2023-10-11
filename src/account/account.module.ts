import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../person/entities/person.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Person])],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PersonModule } from "../person/person.module";
import { HashModule } from "../hash/hash.module";

@Module({
    imports: [PersonModule, HashModule],
    controllers: [AuthController],
})
export class AuthModule {}

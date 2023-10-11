import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PersonModule } from "../person/person.module";

@Module({
    imports: [PersonModule],
    controllers: [AuthController],
})
export class AuthModule {}

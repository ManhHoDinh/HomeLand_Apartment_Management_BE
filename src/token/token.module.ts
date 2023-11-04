import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TokenController } from "./token.controller";

@Module({
    imports: [AuthModule],
    controllers: [TokenController],
})
export class TokenModule {}

import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [TokenController],
})
export class TokenModule {}

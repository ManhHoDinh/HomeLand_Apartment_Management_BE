import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Roles } from "../helper/decorator/roles.decorator";
import { JWTAuthGuard } from "../helper/guard/jwt.guard";
import { RolesGuard } from "../helper/guard/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("account")
@Controller("account")
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard, RolesGuard)
    @Roles(["admin", "manager"])
    @Post()
    create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountService.create(createAccountDto);
    }
}

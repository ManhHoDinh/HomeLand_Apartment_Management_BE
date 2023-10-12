import { Controller, Post, Body } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "../helper/decorator/auth.decorator";

@ApiTags("account")
@Controller("account")
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    /**
     * Create account, only token from admin or manager can access this API
     *
     * Account must associate with person profile
     */
    @ApiOperation({ summary: "Create account" })
    @Auth("admin", "manager")
    @Post()
    create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountService.create(createAccountDto);
    }
}

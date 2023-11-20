// @ts-nocheck
import { Controller, Post, Body } from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService, AuthServiceImp } from "./auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthServiceImp) {}

    @ApiOperation({
        summary: "Sign in to get access token and account role",
    })
    @ApiCreatedResponse({
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        access_token: {
                            type: "string",
                            example: "eyJhbG...",
                        },
                        role: {
                            type: "enum",
                            enum: [
                                "admin",
                                "manager",
                                "technician",
                                "resident",
                            ],
                        },
                    },
                },
            },
        },
    })
    @Post("signin")
    async login(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }
}

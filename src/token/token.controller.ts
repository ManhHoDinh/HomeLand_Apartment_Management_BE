import { Body, Controller, Get, Post } from "@nestjs/common";
import { Auth } from "../helper/decorator/auth.decorator";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../auth/dto/signin.dto";
import { AuthService } from "../auth/auth.service";

@Controller("token")
export class TokenController {
    constructor(private readonly authService: AuthService) {}

    @Auth()
    @Get("/validate")
    validateToken() {
        return "Token is valid";
    }

    @Post("/expiredToken")
    getExiredToken(@Body() signinDto: SignInDto) {
        return this.authService.signIn(signinDto, "1s");
    }
}

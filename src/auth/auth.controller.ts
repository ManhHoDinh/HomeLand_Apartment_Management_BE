import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dto/login.dto";
import { PersonRepository } from "../person/person.service";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly personService: PersonRepository,
        private readonly jwtService: JwtService
    ) {}

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
    async login(@Body() loginDto: SignInDto) {
        const person = await this.personService.findOneByEmail(loginDto.email);
        if (person && person.password) {
            if (compareSync(loginDto.password, person.password)) {
                const payload = {
                    id: person.id,
                    role: person.role,
                };
                return {
                    access_token: this.jwtService.sign(payload),
                    role: person.role,
                };
            }
        }
        throw new UnauthorizedException("Wrong email or password");
    }
}

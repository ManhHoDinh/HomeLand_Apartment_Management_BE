import {
    Controller,
    Post,
    Body,
    UnauthorizedException,
} from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { PersonRepository } from "../person/person.service";
import { JwtService } from "@nestjs/jwt";
import {
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { HashService } from "../hash/hash.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly personService: PersonRepository,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
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
    async login(@Body() signInDto: SignInDto) {
        const person = await this.personService.findOneByEmail(
            signInDto.email,
        );
        if (
            !person ||
            !person.password ||
            !this.hashService.isMatch(
                signInDto.password,
                person.password,
            )
        ) {
            throw new UnauthorizedException(
                "Wrong email or password",
            );
        }
        const payload: TokenPayload = {
            id: person.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
            role: person.role,
        };
    }
}

export interface TokenPayload {
    id: string;
}

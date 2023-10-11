import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: "abcxyz@gmail.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "123123123" })
    @IsString()
    password: string;
}

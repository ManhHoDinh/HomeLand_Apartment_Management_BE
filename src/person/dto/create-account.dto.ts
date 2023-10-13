import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAccountDto {
    @ApiProperty({
        type: "string",
        format: "email",
        example: "abcxyz@gmail.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "123123123",
    })
    @IsString()
    password: string;
}

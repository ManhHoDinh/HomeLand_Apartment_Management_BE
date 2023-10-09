import { IsPhoneNumber, IsString } from "class-validator";

export class SignInDto {
    @IsPhoneNumber('VN')
    phone_number: string;

    @IsString()
    password: string;
}

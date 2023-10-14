import { ApiProperty } from "@nestjs/swagger";
import { Gender, PersonRole } from "../entities/person.entity";
import {
    IsDateString,
    IsEnum,
    IsPhoneNumber,
    IsString,
} from "class-validator";

export class CreatePersonDto {
    @ApiProperty({
        example: "Nguyen Van A",
    })
    @IsString()
    name: string;

    @ApiProperty({
        default: PersonRole.ADMIN,
    })
    @IsEnum(PersonRole)
    role: PersonRole;

    @ApiProperty({
        default: "1990-01-01",
    })
    @IsDateString()
    date_of_birth: Date;

    @ApiProperty({
        default: Gender.MALE,
    })
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({
        default: "0999999999",
    })
    @IsPhoneNumber("VN")
    phone_number: string;

    @ApiProperty({ type: "file", format: "binary", required: true })
    front_identify_card_photo: Express.Multer.File;

    @ApiProperty({ type: "file", format: "binary", required: true })
    back_identify_card_photo: Express.Multer.File;
}

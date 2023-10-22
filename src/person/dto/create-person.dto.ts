import { ApiProperty, PickType } from "@nestjs/swagger";
import { Person } from "../entities/person.entity";

export class CreatePersonDto extends PickType(Person, [
    "name",
    "role",
    "date_of_birth",
    "gender",
    "phone_number",
    "password",
    "email",
    "activated_at",
    "stay_at_apartment_id",
] as const) {
    @ApiProperty({ type: "file", format: "binary", required: true })
    front_identify_card_photo: Express.Multer.File;

    @ApiProperty({ type: "file", format: "binary", required: true })
    back_identify_card_photo: Express.Multer.File;
}

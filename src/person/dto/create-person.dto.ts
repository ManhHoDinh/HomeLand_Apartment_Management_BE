import { ApiProperty, PickType } from "@nestjs/swagger";
import { Person } from "../entities/person.entity";

export class CreatePersonDto extends PickType(Person, [
    "role",
    "name",
    "date_of_birth",
    "gender",
    "phone_number",
] as const) {
    @ApiProperty({ type: "file", format: "binary", required: true })
    front_identify_card_photo_URL: string | Express.Multer.File;

    @ApiProperty({ type: "file", format: "binary", required: true })
    back_identify_card_photo_URL: string | Express.Multer.File;
}

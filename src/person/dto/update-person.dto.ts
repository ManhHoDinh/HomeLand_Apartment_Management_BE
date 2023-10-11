import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePersonDto } from "./create-person.dto";

export class UpdatePersonDto extends PartialType(
    OmitType(CreatePersonDto, [
        "back_identify_card_photo_URL",
        "front_identify_card_photo_URL",
    ] as const)
) {}

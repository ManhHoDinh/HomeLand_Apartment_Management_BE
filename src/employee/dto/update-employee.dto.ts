import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "./create-employee.dto";

export class UpdateEmployeeDto extends PartialType(
    OmitType(CreateEmployeeDto, [
        "back_identify_card_photo",
        "front_identify_card_photo",
    ] as const),
) {}

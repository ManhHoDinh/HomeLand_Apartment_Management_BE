import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Equipment } from "../entities/equipment.entity";
import { IsOptional, Validate, isArray } from "class-validator";
import { MemoryStoredFile } from "nestjs-form-data";
import { IsURLOrImageFile } from "../../apartment/isURLOrImageFile";
import { Transform } from "class-transformer";

export class UpdateEquipmentDto extends PartialType(
    OmitType(Equipment, ["id", "imageURLs", "apartment", "floor", "building"]),
) {
    @ApiProperty({
        type: "array",
        items: {
            anyOf: [
                {
                    type: "string",
                    format: "url",
                },
                {
                    type: "string",
                    format: "binary",
                },
            ],
        },
    })
    @IsOptional()
    @Transform(({ value }) =>
        isArray(value) ? value : value ? [value] : undefined,
    )
    @Validate(IsURLOrImageFile, { each: true })
    images?: (string | MemoryStoredFile)[];
}

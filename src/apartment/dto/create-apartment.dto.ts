import { ApiProperty, PickType } from "@nestjs/swagger";
import { Apartment } from "../entities/apartment.entity";
import { IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateApartmentDto extends PickType(Apartment, [
    "width",
    "length",
    "floor_id",
    "building_id",
    "description",
    "number_of_bathroom",
    "number_of_bedroom",
    "rent",
] as const) {
    @ApiProperty({
        type: "file",
        format: "binary",
        required: true,
        isArray: true,
    })
    images: Express.Multer.File[];

    @ApiProperty({
        type: "string",
        required: false,
        example: ["RSD000000"],
        isArray: true,
    })
    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (!Array.isArray(value)) return [value];
        return value;
    })
    residentIds?: string[];
}

import { Floor } from './../entities/floor.entity';
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { HasMimeType, IsFiles, MaxFileSize } from "nestjs-form-data";
import { commonImageMIMETypes } from "../../helper/constant";

export class CreateFloorDto extends PickType(Floor, [
    "name",
    "building_id"

] as const) {
    @ApiProperty()
    @IsNumberString()
    max_apartment: number
}

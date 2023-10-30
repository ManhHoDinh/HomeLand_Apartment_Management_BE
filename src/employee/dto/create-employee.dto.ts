import { ApiProperty, PickType } from "@nestjs/swagger";
import { Employee } from "../entities/employee.entity";
import { IsOptional } from "class-validator";
import {
    HasMimeType,
    IsFile,
    MaxFileSize,
    MemoryStoredFile,
    isFile,
} from "nestjs-form-data";
import { commonImageMIMETypes } from "../../helper/constant";
import { Transform } from "class-transformer";

export class CreateEmployeeDto extends PickType(Employee, [
    "name",
    "date_of_birth",
    "gender",
    "phone_number",
    "email",
] as const) {


    @ApiProperty({ type: "file", required: true })
    @IsFile()
    @MaxFileSize(10e6)
    @HasMimeType(commonImageMIMETypes)
    front_identify_card_photo: MemoryStoredFile;

    @ApiProperty({ type: "file", required: true })
    @IsFile()
    @MaxFileSize(10e6)
    @HasMimeType(commonImageMIMETypes)
    back_identify_card_photo: MemoryStoredFile;

    @ApiProperty({ type: "file", required: false })
    @Transform(({ value }) => (isFile(value) ? value : undefined))
    @IsOptional()
    @MaxFileSize(10e6)
    @HasMimeType(commonImageMIMETypes)
    avatar_photo?: MemoryStoredFile;
}

// @ts-nocheck
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "./create-employee.dto";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { commonImageMIMETypes } from "../../helper/constant";
import { Gender, PersonRole } from "../../helper/class/profile.entity";
import { Profile } from "../../helper/class/profile.entity";
export class UpdateEmployeeDto extends PartialType(OmitType(CreateEmployeeDto, (["back_identify_card_photo", "front_identify_card_photo"] as const))) {
  @ApiProperty({
    type: "file",
    required: false
  })
  @IsFile()
  @IsOptional()
  @MaxFileSize(10e6)
  @HasMimeType(commonImageMIMETypes)
  front_identify_card_photo: MemoryStoredFile;
  @ApiProperty({
    type: "file",
    required: false
  })
  @IsFile()
  @IsOptional()
  @MaxFileSize(10e6)
  @HasMimeType(commonImageMIMETypes)
  back_identify_card_photo: MemoryStoredFile;
}
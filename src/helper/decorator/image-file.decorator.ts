import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HasMimeType, IsFile, IsFiles, MaxFileSize } from "nestjs-form-data";
import { commonImageMIMETypes } from "../constant";
import { IsDefined, IsOptional } from "class-validator";

export function IsImageFile(isOptional = false) {
    return applyDecorators(
        ApiProperty({ type: "file", required: !isOptional }),
        isOptional ? IsOptional() : IsDefined(),
        IsFile(),
        MaxFileSize(10e6),
        HasMimeType(commonImageMIMETypes),
    );
}

export function IsImageFiles(isOptional = false) {
    return applyDecorators(
        ApiProperty({ type: "file", required: !isOptional }),
        isOptional ? IsOptional() : IsDefined(),
        IsFiles(),
        MaxFileSize(10e6),
        HasMimeType(commonImageMIMETypes),
    );
}

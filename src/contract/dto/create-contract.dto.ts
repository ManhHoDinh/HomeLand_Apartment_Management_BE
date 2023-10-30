import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";
import {
    HasMimeType,
    IsFile,
    MaxFileSize,
    MemoryStoredFile,
} from "nestjs-form-data";
import { commonImageMIMETypes } from "src/helper/constant";
import { Contract } from "../entities/contract.entity";

export class CreateContractDto extends PickType(Contract, [] as const) {
    @ApiProperty({ example: null, description: "The Previous contract id" })
    @IsOptional()
    @IsString()
    previous_contract_id?: string;
    
    @ApiProperty({ example: "Res123", description: "The resident id" })
    @IsString()
    resident_id: string;
    
    @ApiProperty({ example: new Date(), description: "The expire date" })
    @IsOptional()
    @IsDateString()
    expire_at: Date;
    
    @ApiProperty({
        example: "APM1698502960091",
        description: "The Apartment id",
    })
    @IsString()
    apartment_id: string;
    
    @ApiProperty({
        type: "file",
        required: true,
    })
    @IsFile()
    @MaxFileSize(10e6, { each: true })
    @HasMimeType(commonImageMIMETypes, { each: true })
    image: MemoryStoredFile;
}

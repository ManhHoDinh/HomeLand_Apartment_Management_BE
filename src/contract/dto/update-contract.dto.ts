import {  ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateContractDto  {
    @ApiProperty({ example: null, description: "The Previous contract id" })
    @IsOptional()
    
    previous_contract_id?: string;
    @ApiProperty({ example: "1", description: "The contract id" })
    @IsOptional()
    
    resident_id: string;
    @IsDateString()
    expired_at: Date;
    @ApiProperty({
        example: "APM1698224764681",
        description: "The Previous contract id",
    })
    @IsString()
    property_id: string;

}

import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateContractDto {
    @ApiProperty({ example: "1", description: "The contract id" })
    @IsString()
    contract_id: string;
    @ApiProperty({ example: null, description: "The Previous contract id" })
    @IsOptional()
    @IsString()
    previous_contract_id?: string;
    @ApiProperty({ example: "RES1698503013193", description: "The resident id" })
    @IsString()
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

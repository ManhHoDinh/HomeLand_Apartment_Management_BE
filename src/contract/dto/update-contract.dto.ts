import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { CreateContractDto } from "./create-contract.dto";

export class UpdateContractDto extends OmitType(CreateContractDto, [
    "contract_id",
] as const) {}

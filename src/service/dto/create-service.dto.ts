import { ApiProperty, PickType } from "@nestjs/swagger";
import { Service } from "../entities/service.entity";
import { IsOptional } from "class-validator";
import { MemoryStoredFile } from "nestjs-form-data";

export class CreateServiceDto extends PickType(Service, [
    "name",
    "description",
] as const) {
    @ApiProperty({
        type: "file",
        required: false,
        description: "The service images",
        isArray: true,
    })
    @IsOptional()
    images?: MemoryStoredFile[];
}

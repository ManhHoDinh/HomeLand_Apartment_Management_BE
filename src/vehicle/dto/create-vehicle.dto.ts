import { IsNumber, IsString } from "class-validator";
import { IsImageFile } from "../../helper/decorator/image-file.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { MemoryStoredFile } from "nestjs-form-data";

export class createVehicleDto {
    @IsImageFile()
    licensePlate: MemoryStoredFile;

    @IsImageFile()
    frontRegistrationPhoto: MemoryStoredFile;

    @IsImageFile()
    backRegistrationPhoto: MemoryStoredFile;

    @IsString()
    residentId: string;
}

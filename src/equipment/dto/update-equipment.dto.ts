import { OmitType, PartialType } from "@nestjs/swagger";
import { Equipment } from "../entities/equipment.entity";
import { MemoryStoredFile } from "nestjs-form-data";
import { IsImageFiles } from "../../helper/decorator/image-file.decorator";

export class UpdateEquipmentDto extends PartialType(
    OmitType(Equipment, [
        "id",
        "imageURLs",
        "apartment",
        "floor",
        "building",
        "created_at",
        "deleted_at",
    ]),
) {
    @IsImageFiles(true)
    images?: MemoryStoredFile[];
}

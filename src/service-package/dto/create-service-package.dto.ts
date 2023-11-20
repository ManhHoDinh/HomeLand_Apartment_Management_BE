import { OmitType } from "@nestjs/swagger";
import { ServicePackage } from "../entities/service-package.entity";

export class CreateServicePackageDto extends OmitType(ServicePackage, [
    "service","servicePackage_id"
] as const) {}

import { PickType } from "@nestjs/swagger";
import { Vehicle } from "../entities/vehicle.entity";

export class UpdateVehicleDto extends PickType(Vehicle, ["status"] as const) {}

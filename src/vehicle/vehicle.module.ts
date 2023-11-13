import { Module } from "@nestjs/common";
import { VehicleService, VehicleServiceImp } from "./vehicle.service";
import { VehicleController } from "./vehicle.controller";
import {
    PlateOCRService,
    PlateOCRServiceImp,
} from "../plate-ocr/plate-ocr.service";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { HttpModule } from "@nestjs/axios";
import { StorageModule } from "../storage/storage.module";
import { Resident } from "../resident/entities/resident.entity";
import { IdGeneratorModule } from "../id-generator/id-generator.module";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Vehicle, Resident]),
        HttpModule,
        StorageModule,
        IdGeneratorModule,
    ],
    providers: [
        {
            provide: VehicleService,
            useClass: VehicleServiceImp,
        },
        {
            provide: PlateOCRService,
            useClass: PlateOCRServiceImp,
        },
    ],
    controllers: [VehicleController],
})
export class VehicleModule {}

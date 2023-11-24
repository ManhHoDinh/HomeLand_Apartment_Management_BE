import { Module } from "@nestjs/common";
import { ApartmentService, ApartmentServiceImp } from "./apartment.service";
import { ApartmentController } from "./apartment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apartment } from "./entities/apartment.entity";
import { IdGeneratorModule } from "../id-generator/id-generator.module";
import { StorageModule } from "../storage/storage.module";
import { Resident } from "../resident/entities/resident.entity";
import { AuthModule } from "../auth/auth.module";
import { ApartmentSubcriber } from "./apartment.subscriber";

@Module({
    imports: [
        TypeOrmModule.forFeature([Apartment, Resident]),
        IdGeneratorModule,
        StorageModule,
        AuthModule,
    ],
    controllers: [ApartmentController],
    providers: [
        ApartmentSubcriber,
        {
            provide: ApartmentService,
            useClass: ApartmentServiceImp,
        },
    ],
    exports: [ApartmentService],
})
export class ApartmentModule {}

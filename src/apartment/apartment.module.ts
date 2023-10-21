import { Module } from "@nestjs/common";
import {
    ApartmentRepository,
    ApartmentService,
} from "./apartment.service";
import { ApartmentController } from "./apartment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apartment } from "./entities/apartment.entity";
import { IdGeneratorModule } from "../id_generator/id-generator.module";
import { UploadModule } from "../upload/upload.module";
import { Resident } from "../person/entities/person.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Apartment, Resident]),
        IdGeneratorModule,
        UploadModule,
    ],
    controllers: [ApartmentController],
    providers: [
        {
            provide: ApartmentRepository,
            useClass: ApartmentService,
        },
    ],
    exports: [ApartmentRepository],
})
export class ApartmentModule {}

import { Module } from "@nestjs/common";
import { SeedingService } from "./seeding.service";
import { PersonModule } from "../person/person.module";
import { SeedingController } from "./seeding.controller";
import { ApartmentModule } from "../apartment/apartment.module";

@Module({
    imports: [PersonModule, ApartmentModule],
    controllers: [SeedingController],
    providers: [SeedingService],
})
export class SeedingModule {}

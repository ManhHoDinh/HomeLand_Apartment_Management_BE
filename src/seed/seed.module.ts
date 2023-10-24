import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { PersonModule } from "../person/person.module";
import { Seed } from "./seed.controller";
import { ApartmentModule } from "../apartment/apartment.module";
import { UploadModule } from "../upload/upload.module";

@Module({
    imports: [PersonModule, ApartmentModule, UploadModule],
    controllers: [Seed],
    providers: [SeedService],
})
export class SeedModule {}

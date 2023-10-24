import { Module } from "@nestjs/common";
import { PersonFactory } from "./person-factory.service";
import { IdGeneratorModule } from "../id_generator/id_generator.module";

@Module({
    imports: [IdGeneratorModule],
    providers: [PersonFactory],
    exports: [PersonFactory],
})
export class PersonFactoryModule {}

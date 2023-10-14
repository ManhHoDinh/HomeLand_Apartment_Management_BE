import { Module } from "@nestjs/common";
import { PersonFactory } from "./person-factory.service";

@Module({
    providers: [PersonFactory],
    exports: [PersonFactory],
})
export class PersonFactoryModule {}

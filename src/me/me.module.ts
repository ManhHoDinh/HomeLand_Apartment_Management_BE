import { Module } from "@nestjs/common";
import { MeController } from "./me.controller";
import { PersonModule } from "../person/person.module";

@Module({
    imports: [PersonModule],
    controllers: [MeController],
})
export class MeModule {}

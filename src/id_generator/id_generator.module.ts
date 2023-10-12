import { Module } from "@nestjs/common";
import { IdGenerator, IdGeneratorService } from "./id_generator.service";

@Module({
    providers: [
        {
            provide: IdGenerator,
            useClass: IdGeneratorService,
        },
    ],
    exports: [IdGenerator],
})
export class IdGeneratorModule {}

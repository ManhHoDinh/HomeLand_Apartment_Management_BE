import { Global, Module } from "@nestjs/common";
import { PersonRepository, PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "./entities/person.entity";
import { IdGeneratorModule } from "../id_generator/id_generator.module";
import { UploadModule } from "../upload/upload.module";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Person]),
        IdGeneratorModule,
        UploadModule,
    ],
    controllers: [PersonController],
    providers: [
        {
            provide: PersonRepository,
            useClass: PersonService,
        },
    ],
    exports: [PersonRepository],
})
export class PersonModule {}

import { Module } from '@nestjs/common';
import { IdGeneratorService } from './id_generator.service';

@Module({
    providers: [IdGeneratorService],
    exports: [IdGeneratorService]
})
export class IdGeneratorModule { }

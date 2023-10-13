import { Module } from "@nestjs/common";
import { BcryptHash, HashService } from "./hash.service";

@Module({
    providers: [
        {
            provide: HashService,
            useClass: BcryptHash,
        },
    ],
    exports: [HashService],
})
export class HashModule {}

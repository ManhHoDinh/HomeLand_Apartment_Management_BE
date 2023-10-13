import { Module } from "@nestjs/common";
import { SupabaseService, UploadService } from "./upload.service";

@Module({
    providers: [
        {
            provide: UploadService,
            useClass: SupabaseService,
        },
    ],
    exports: [UploadService],
})
export class UploadModule {}

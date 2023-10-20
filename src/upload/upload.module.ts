import { Module } from "@nestjs/common";
import { SupabaseService, UploadService } from "./upload.service";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

@Module({
    providers: [
        {
            provide: UploadService,
            useClass: SupabaseService,
        },
        {
            provide: SupabaseClient,
            useFactory: () => {
                if (process.env.IS_PRODUCTION == "true") {
                    return createClient(
                        process.env.SUPABASE_URL || "nothing",
                        process.env.SUPABASE_KEY || "nothing",
                    );
                } else {
                    return createClient(
                        process.env.SUPABASE_LOCAL_URL || "nothing",
                        process.env.SUPABASE_LOCAL_KEY || "nothing",
                    );
                }
            },
        },
    ],
    exports: [UploadService, SupabaseClient],
})
export class UploadModule {}

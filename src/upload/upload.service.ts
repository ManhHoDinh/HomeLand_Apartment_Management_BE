import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

export abstract class UploadService {
    abstract uploadAndGetURL(
        file: any,
        uploadPath: string,
        mime?: string
    ): Promise<string>;
}

@Injectable()
export class SupabaseService extends UploadService {
    readonly supabase = createClient(
        process.env.SUPABASE_URL || "supabaseurltest",
        process.env.SUPABASE_KEY || "supabasekeytest"
    );

    private BLOB_STORAGE_URL =
        process.env.SUPABASE_URL + "/storage/v1/object/public/HomeLand";

    async uploadAndGetURL(
        file: any,
        uploadPath: string,
        mime: string = "text/plain;charset=UTF-8"
    ): Promise<string> {
        const { data, error } = await this.supabase.storage
            .from("HomeLand")
            .upload(uploadPath, file.buffer, {
                contentType: mime,
            });

        if (error) throw error;
        return this.BLOB_STORAGE_URL + "/" + data.path;
    }
}

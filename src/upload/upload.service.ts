import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class UploadService {
    readonly supabase = createClient(
        process.env.SUPABASE_URL || "supabaseurltest",
        process.env.SUPABASE_KEY || "supabasekeytest"
    );

    public BLOB_STORAGE_URL =
        process.env.SUPABASE_URL + "/storage/v1/object/public/HomeLand";

    async upload(
        file: any,
        uploadPath: string,
        mime = "text/plain;charset=UTF-8"
    ): Promise<{ path: string }> {
        const { data, error } = await this.supabase.storage
            .from("HomeLand")
            .upload(uploadPath, file.buffer, {
                contentType: mime,
            });

        if (error) throw error;
        return data;
    }
}

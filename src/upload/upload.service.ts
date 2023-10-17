import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

export abstract class UploadService {
    abstract uploadAndGetURL(
        file: any,
        uploadPath: string,
        mime?: string,
    ): Promise<string>;
    abstract save(
        personId: string,
        frontIdentifyCardPhoto: any,
        backIdentifyCardPhoto: any,
    ): Promise<string[]>;
    abstract remove(personId: string): Promise<boolean>;
}

@Injectable()
export class SupabaseService extends UploadService {
    constructor(private readonly supabaseClient: SupabaseClient) {
        super();
    }

    async save(
        personId: string,
        frontIdentifyCardPhoto: any,
        backIdentifyCardPhoto: any,
    ): Promise<string[]> {
        const [frontURL, backURL] = await Promise.all([
            this.uploadAndGetURL(
                frontIdentifyCardPhoto,
                "/person/" +
                    personId +
                    "/front_identify_card_photo_URL.png",
                "image/png",
            ),

            this.uploadAndGetURL(
                backIdentifyCardPhoto,
                "/person/" +
                    personId +
                    "/back_identify_card_photo_URL.png",
                "image/png",
            ),
        ]);
        return [frontURL, backURL];
    }

    async remove(personId: string): Promise<boolean> {
        const { data, error } = await this.supabaseClient.storage
            .from("homeland")
            .remove([
                "/person/" +
                    personId +
                    "/front_identify_card_photo_URL.png",
                "/person/" +
                    personId +
                    "/back_identify_card_photo_URL.png",
            ]);

        if (error) throw error;
        return true;
    }

    private BLOB_STORAGE_URL =
        (process.env.IS_PRODUCTION == "true"
            ? process.env.SUPABASE_URL
            : process.env.SUPABASE_LOCAL_URL ||
              process.env.SUPABASE_URL) +
        "/storage/v1/object/public/homeland";

    async uploadAndGetURL(
        file: any,
        uploadPath: string,
        mime: string = "text/plain;charset=UTF-8",
    ): Promise<string> {
        const { data, error } = await this.supabaseClient.storage
            .from("homeland")
            .upload(uploadPath, file.buffer, {
                contentType: mime,
            });

        if (error) throw error;
        return this.BLOB_STORAGE_URL + "/" + data.path;
    }
}

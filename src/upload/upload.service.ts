import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { Person } from "../person/entities/person.entity";

export abstract class UploadService {
    abstract uploadAndGetURL(
        file: any,
        uploadPath: string,
        mime?: string,
    ): Promise<string>;
    abstract save(
        person: Person,
        frontIdentifyCardPhoto: any,
        backIdentifyCardPhoto: any,
    ): Promise<Person>;
}

@Injectable()
export class SupabaseService extends UploadService {
    async save(
        person: Person,
        frontIdentifyCardPhoto: any,
        backIdentifyCardPhoto: any,
    ): Promise<Person> {
        const [frontURL, backURL] = await Promise.all([
            this.uploadAndGetURL(
                frontIdentifyCardPhoto,
                "/person/" +
                    person.id +
                    "/front_identify_card_photo_URL.png",
                "image/png",
            ),

            this.uploadAndGetURL(
                backIdentifyCardPhoto,
                "/person/" +
                    person.id +
                    "/back_identify_card_photo_URL.png",
                "image/png",
            ),
        ]);
        person.front_identify_card_photo_URL = frontURL;
        person.back_identify_card_photo_URL = backURL;
        return person;
    }

    readonly supabase = createClient(
        process.env.SUPABASE_URL || "supabaseurltest",
        process.env.SUPABASE_KEY || "supabasekeytest",
    );

    private BLOB_STORAGE_URL =
        process.env.SUPABASE_URL +
        "/storage/v1/object/public/HomeLand";

    async uploadAndGetURL(
        file: any,
        uploadPath: string,
        mime: string = "text/plain;charset=UTF-8",
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

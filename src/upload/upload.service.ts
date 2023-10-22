import { Injectable, OnModuleInit } from "@nestjs/common";
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Upload service interface
 */
export abstract class UploadService {
    /**
     * Upload a file to remote storage and return the public URL
     * @param file file must have buffer property
     * @param path path to upload on remote storage
     * @param mime MIME type of file
     */
    abstract upload(
        file: { buffer: Buffer },
        path: string,
        mime?: string,
    ): Promise<string>;

    abstract createBucket();
    abstract removeBucket();

    /**
     * @param paths path to files will be remove on remote storage
     */
    abstract remove(paths: string[]): Promise<boolean>;
}

@Injectable()
export class SupabaseService
    extends UploadService
    implements OnModuleInit
{
    async removeBucket() {
        await this.supabaseClient.storage.emptyBucket(
            this.BUCKET_NAME,
        );
        await this.supabaseClient.storage.deleteBucket(
            this.BUCKET_NAME,
        );
    }
    async createBucket() {
        await this.supabaseClient.storage.createBucket(
            this.BUCKET_NAME,
        );
    }
    constructor(private readonly supabaseClient: SupabaseClient) {
        super();
    }

    private readonly BUCKET_NAME = "homeland";

    private bucket: StorageFileApi;

    onModuleInit() {
        this.bucket = this.supabaseClient.storage.from(
            this.BUCKET_NAME,
        );
    }

    async remove(paths: string[]): Promise<boolean> {
        const { error } = await this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .remove(paths);

        if (error) throw error;
        return true;
    }

    async upload(
        file: { buffer: Buffer },
        uploadPath: string,
        mime: string = "text/plain;charset=UTF-8",
    ): Promise<string> {
        const { data, error } = await this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .upload(uploadPath, file.buffer, {
                contentType: mime,
            });

        if (error) throw error;
        const response = this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .getPublicUrl(uploadPath);
        return response.data.publicUrl;
    }
}

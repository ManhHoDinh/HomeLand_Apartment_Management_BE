import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { isString, isURL } from "class-validator";

/**
 * @classdesc Upload service interface
 * @abstract
 */
export abstract class StorageManager {
    /**
     * Upload a file to storage and return the URL
     * @throws {StorageError} if upload fail
     * @param buffer file must have buffer property
     * @param path path to upload on remote storage
     * @param mime MIME type of file
     */
    abstract upload(
        buffer: Buffer | ArrayBuffer,
        path: string,
        mime?: string,
    ): Promise<string>;

    /**
     * Remove files on storage
     * @throws {StorageError} if remove fail
     * @param paths path to files will be remove on bucket
     */
    abstract remove(paths: string[]): Promise<boolean>;

    /**
     * Copy file from oldPath to newPath
     * @param oldPath path to file will be copy
     * @param newPath path to file will be copy to
     * @returns public url of new file
     */
    abstract copy(oldPath: string, newPath: string): Promise<string>;

    /**
     * Initiate storage if not exist
     */
    abstract initiateStorage(): Promise<void>;

    /**
     * Destroy storage if exist
     */
    abstract destroyStorage(): Promise<void>;
}

export class StorageError extends Error {
    constructor(objOrString: Partial<StorageError> | string) {
        if (isString(objOrString)) super(objOrString as string);
        else {
            super(objOrString.message);
            Object.assign(this, objOrString);
            Object.setPrototypeOf(this, StorageError.prototype);
        }
    }
}

@Injectable()
export class SupabaseStorageManager extends StorageManager {
    constructor(private readonly supabaseClient: SupabaseClient) {
        super();
    }
    private readonly BUCKET_NAME = "homeland";
    async destroyStorage() {
        await this.supabaseClient.storage.emptyBucket(this.BUCKET_NAME);
        await this.supabaseClient.storage.deleteBucket(this.BUCKET_NAME);
    }

    async initiateStorage() {
        await this.supabaseClient.storage.createBucket(this.BUCKET_NAME, {
            public: true,
        });
    }

    async copy(oldPath: string, newPath: string): Promise<string> {
        const { data, error } = await this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .copy(oldPath, newPath);
        if (error) throw new StorageError(error);

        const response = this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .getPublicUrl(data.path);

        return response.data.publicUrl;
    }

    async remove(pathsOrURLs: string[]): Promise<boolean> {
        if (pathsOrURLs.length === 0) return true;
        const { error } = await this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .remove(
                pathsOrURLs.map(
                    (path) => this.extractPathFromUrl(path) || path,
                ),
            );

        if (error) throw new StorageError(error);
        return true;
    }

    /**
     *
     * @param url public url of file in supabase storage
     * @returns path of file, undefined if url is not valid
     */
    private extractPathFromUrl(url: string): string | undefined {
        if (!isURL(url)) return undefined;
        if (!url.startsWith("http://")) {
            return undefined;
        }
        const prefix = `http://localhost:54321/storage/v1/object/public/${this.BUCKET_NAME}/`;
        if (url.indexOf(prefix) !== 0) {
            return undefined;
        }
        const restOfPath = url.slice(prefix.length);
        return restOfPath;
    }

    async upload(
        file: Buffer | ArrayBuffer,
        uploadPath: string,
        mime: string = "text/plain;charset=UTF-8",
    ): Promise<string> {
        if (!file) throw new Error("File must have buffer property");
        const { error } = await this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .upload(uploadPath, file, {
                contentType: mime,
                upsert: true,
            });

        if (error) throw new StorageError(error);
        const response = this.supabaseClient.storage
            .from(this.BUCKET_NAME)
            .getPublicUrl(uploadPath);
        return response.data.publicUrl;
    }
}

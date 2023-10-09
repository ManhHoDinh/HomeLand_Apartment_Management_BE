import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class UploadService {
  readonly supabase = createClient(
    'https://lmjxnelcwcqzrwiviyfl.supabase.co',
    process.env.SUPABASE_KEY || 'supabasekeytest',
  );

  public BLOB_STORAGE_URL =
    'https://lmjxnelcwcqzrwiviyfl.supabase.co/storage/v1/object/public/HomeLand/';

  async upload(
    file: MemoryStoredFile,
    uploadPath: string,
    mime = 'text/plain;charset=UTF-8',
  ): Promise<{ path: string }> {
    const { data, error } = await this.supabase.storage
      .from('HomeLand')
      .upload(uploadPath, file.buffer, {
        contentType: mime,
      });

    if (error) throw error;
    return data;
  }
}

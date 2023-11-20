// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { Injectable, OnModuleInit } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { isString } from "class-validator";

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
  abstract upload(buffer: Buffer | ArrayBuffer, path: string, mime?: string): Promise<string>;

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
  //abstract copy(oldPath: string, newPath: string): Promise<string>;

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
    if (stryMutAct_9fa48("2006")) {
      {}
    } else {
      stryCov_9fa48("2006");
      if (stryMutAct_9fa48("2008") ? false : stryMutAct_9fa48("2007") ? true : (stryCov_9fa48("2007", "2008"), isString(objOrString))) super((objOrString as string));else {
        if (stryMutAct_9fa48("2009")) {
          {}
        } else {
          stryCov_9fa48("2009");
          super(objOrString.message);
          Object.assign(this, objOrString);
          Object.setPrototypeOf(this, StorageError.prototype);
        }
      }
    }
  }
}
@Injectable()
export class SupabaseStorageManager extends StorageManager implements OnModuleInit {
  constructor(private readonly supabaseClient: SupabaseClient) {
    super();
  }
  async onModuleInit() {
    if (stryMutAct_9fa48("2010")) {
      {}
    } else {
      stryCov_9fa48("2010");
      this.BUCKET_URL_PREFIX = this.supabaseClient.storage.from(this.BUCKET_NAME).getPublicUrl(stryMutAct_9fa48("2011") ? "Stryker was here!" : (stryCov_9fa48("2011"), "")).data.publicUrl;
    }
  }
  private BUCKET_URL_PREFIX = stryMutAct_9fa48("2012") ? "Stryker was here!" : (stryCov_9fa48("2012"), "");
  private readonly BUCKET_NAME = stryMutAct_9fa48("2013") ? "" : (stryCov_9fa48("2013"), "homeland");
  async destroyStorage() {
    if (stryMutAct_9fa48("2014")) {
      {}
    } else {
      stryCov_9fa48("2014");
      await this.supabaseClient.storage.emptyBucket(this.BUCKET_NAME);
      await this.supabaseClient.storage.deleteBucket(this.BUCKET_NAME);
    }
  }
  async initiateStorage() {
    if (stryMutAct_9fa48("2015")) {
      {}
    } else {
      stryCov_9fa48("2015");
      await this.supabaseClient.storage.createBucket(this.BUCKET_NAME, stryMutAct_9fa48("2016") ? {} : (stryCov_9fa48("2016"), {
        public: stryMutAct_9fa48("2017") ? false : (stryCov_9fa48("2017"), true)
      }));
    }
  }

  // async copy(oldPath: string, newPath: string): Promise<string> {
  //     const { data, error } = await this.supabaseClient.storage
  //         .from(this.BUCKET_NAME)
  //         .copy(oldPath, newPath);
  //     if (error) throw new StorageError(error);

  //     const response = this.supabaseClient.storage
  //         .from(this.BUCKET_NAME)
  //         .getPublicUrl(data.path);

  //     return response.data.publicUrl;
  // }

  async remove(pathsOrURLs: string[]): Promise<boolean> {
    if (stryMutAct_9fa48("2018")) {
      {}
    } else {
      stryCov_9fa48("2018");
      if (stryMutAct_9fa48("2021") ? pathsOrURLs.length !== 0 : stryMutAct_9fa48("2020") ? false : stryMutAct_9fa48("2019") ? true : (stryCov_9fa48("2019", "2020", "2021"), pathsOrURLs.length === 0)) return stryMutAct_9fa48("2022") ? false : (stryCov_9fa48("2022"), true);
      console.log(pathsOrURLs.map(stryMutAct_9fa48("2023") ? () => undefined : (stryCov_9fa48("2023"), path => stryMutAct_9fa48("2026") ? this.extractFilePathFromPublicUrl(path) && path : stryMutAct_9fa48("2025") ? false : stryMutAct_9fa48("2024") ? true : (stryCov_9fa48("2024", "2025", "2026"), this.extractFilePathFromPublicUrl(path) || path))));
      const {
        data,
        error
      } = await this.supabaseClient.storage.from(this.BUCKET_NAME).remove(await Promise.all(pathsOrURLs.map(stryMutAct_9fa48("2027") ? () => undefined : (stryCov_9fa48("2027"), async path => stryMutAct_9fa48("2030") ? (await this.extractFilePathFromPublicUrl(path)) && path : stryMutAct_9fa48("2029") ? false : stryMutAct_9fa48("2028") ? true : (stryCov_9fa48("2028", "2029", "2030"), (await this.extractFilePathFromPublicUrl(path)) || path)))));
      if (stryMutAct_9fa48("2032") ? false : stryMutAct_9fa48("2031") ? true : (stryCov_9fa48("2031", "2032"), error)) throw new StorageError(error);
      if (stryMutAct_9fa48("2035") ? data || data.length > 0 : stryMutAct_9fa48("2034") ? false : stryMutAct_9fa48("2033") ? true : (stryCov_9fa48("2033", "2034", "2035"), data && (stryMutAct_9fa48("2038") ? data.length <= 0 : stryMutAct_9fa48("2037") ? data.length >= 0 : stryMutAct_9fa48("2036") ? true : (stryCov_9fa48("2036", "2037", "2038"), data.length > 0)))) return stryMutAct_9fa48("2039") ? false : (stryCov_9fa48("2039"), true);
      return stryMutAct_9fa48("2040") ? true : (stryCov_9fa48("2040"), false);
    }
  }

  /**
   *
   * @param url public url of file in supabase storage
   * @returns path of file, undefined if url is not valid
   */
  private async extractFilePathFromPublicUrl(url: string): Promise<string | undefined> {
    if (stryMutAct_9fa48("2041")) {
      {}
    } else {
      stryCov_9fa48("2041");
      if (stryMutAct_9fa48("2044") ? url.indexOf(this.BUCKET_URL_PREFIX) === 0 : stryMutAct_9fa48("2043") ? false : stryMutAct_9fa48("2042") ? true : (stryCov_9fa48("2042", "2043", "2044"), url.indexOf(this.BUCKET_URL_PREFIX) !== 0)) {
        if (stryMutAct_9fa48("2045")) {
          {}
        } else {
          stryCov_9fa48("2045");
          return undefined;
        }
      }
      const restOfPath = stryMutAct_9fa48("2046") ? url : (stryCov_9fa48("2046"), url.slice(this.BUCKET_URL_PREFIX.length));
      return restOfPath;
    }
  }
  async upload(file: Buffer | ArrayBuffer, uploadPath: string, mime: string = stryMutAct_9fa48("2047") ? "" : (stryCov_9fa48("2047"), "text/plain;charset=UTF-8")): Promise<string> {
    if (stryMutAct_9fa48("2048")) {
      {}
    } else {
      stryCov_9fa48("2048");
      if (stryMutAct_9fa48("2051") ? false : stryMutAct_9fa48("2050") ? true : stryMutAct_9fa48("2049") ? file : (stryCov_9fa48("2049", "2050", "2051"), !file)) throw new Error(stryMutAct_9fa48("2052") ? "" : (stryCov_9fa48("2052"), "File must have buffer property"));
      const {
        error
      } = await this.supabaseClient.storage.from(this.BUCKET_NAME).upload(uploadPath, file, stryMutAct_9fa48("2053") ? {} : (stryCov_9fa48("2053"), {
        contentType: mime,
        upsert: stryMutAct_9fa48("2054") ? false : (stryCov_9fa48("2054"), true)
      }));
      if (stryMutAct_9fa48("2056") ? false : stryMutAct_9fa48("2055") ? true : (stryCov_9fa48("2055", "2056"), error)) throw new StorageError(error);
      const response = this.supabaseClient.storage.from(this.BUCKET_NAME).getPublicUrl(uploadPath);
      return response.data.publicUrl;
    }
  }
}
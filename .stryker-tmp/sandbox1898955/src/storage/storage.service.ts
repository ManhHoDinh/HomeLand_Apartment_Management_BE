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
    if (stryMutAct_9fa48("745")) {
      {}
    } else {
      stryCov_9fa48("745");
      if (stryMutAct_9fa48("747") ? false : stryMutAct_9fa48("746") ? true : (stryCov_9fa48("746", "747"), isString(objOrString))) super((objOrString as string));else {
        if (stryMutAct_9fa48("748")) {
          {}
        } else {
          stryCov_9fa48("748");
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
    if (stryMutAct_9fa48("749")) {
      {}
    } else {
      stryCov_9fa48("749");
      this.BUCKET_URL_PREFIX = this.supabaseClient.storage.from(this.BUCKET_NAME).getPublicUrl(stryMutAct_9fa48("750") ? "Stryker was here!" : (stryCov_9fa48("750"), "")).data.publicUrl;
    }
  }
  private BUCKET_URL_PREFIX = stryMutAct_9fa48("751") ? "Stryker was here!" : (stryCov_9fa48("751"), "");
  private readonly BUCKET_NAME = stryMutAct_9fa48("752") ? "" : (stryCov_9fa48("752"), "homeland");
  async destroyStorage() {
    if (stryMutAct_9fa48("753")) {
      {}
    } else {
      stryCov_9fa48("753");
      await this.supabaseClient.storage.emptyBucket(this.BUCKET_NAME);
      await this.supabaseClient.storage.deleteBucket(this.BUCKET_NAME);
    }
  }
  async initiateStorage() {
    if (stryMutAct_9fa48("754")) {
      {}
    } else {
      stryCov_9fa48("754");
      await this.supabaseClient.storage.createBucket(this.BUCKET_NAME, stryMutAct_9fa48("755") ? {} : (stryCov_9fa48("755"), {
        public: stryMutAct_9fa48("756") ? false : (stryCov_9fa48("756"), true)
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
    if (stryMutAct_9fa48("757")) {
      {}
    } else {
      stryCov_9fa48("757");
      if (stryMutAct_9fa48("760") ? pathsOrURLs.length !== 0 : stryMutAct_9fa48("759") ? false : stryMutAct_9fa48("758") ? true : (stryCov_9fa48("758", "759", "760"), pathsOrURLs.length === 0)) return stryMutAct_9fa48("761") ? false : (stryCov_9fa48("761"), true);
      console.log(pathsOrURLs.map(stryMutAct_9fa48("762") ? () => undefined : (stryCov_9fa48("762"), path => stryMutAct_9fa48("765") ? this.extractFilePathFromPublicUrl(path) && path : stryMutAct_9fa48("764") ? false : stryMutAct_9fa48("763") ? true : (stryCov_9fa48("763", "764", "765"), this.extractFilePathFromPublicUrl(path) || path))));
      const {
        data,
        error
      } = await this.supabaseClient.storage.from(this.BUCKET_NAME).remove(await Promise.all(pathsOrURLs.map(stryMutAct_9fa48("766") ? () => undefined : (stryCov_9fa48("766"), async path => stryMutAct_9fa48("769") ? (await this.extractFilePathFromPublicUrl(path)) && path : stryMutAct_9fa48("768") ? false : stryMutAct_9fa48("767") ? true : (stryCov_9fa48("767", "768", "769"), (await this.extractFilePathFromPublicUrl(path)) || path)))));
      if (stryMutAct_9fa48("771") ? false : stryMutAct_9fa48("770") ? true : (stryCov_9fa48("770", "771"), error)) throw new StorageError(error);
      if (stryMutAct_9fa48("774") ? data || data.length > 0 : stryMutAct_9fa48("773") ? false : stryMutAct_9fa48("772") ? true : (stryCov_9fa48("772", "773", "774"), data && (stryMutAct_9fa48("777") ? data.length <= 0 : stryMutAct_9fa48("776") ? data.length >= 0 : stryMutAct_9fa48("775") ? true : (stryCov_9fa48("775", "776", "777"), data.length > 0)))) return stryMutAct_9fa48("778") ? false : (stryCov_9fa48("778"), true);
      return stryMutAct_9fa48("779") ? true : (stryCov_9fa48("779"), false);
    }
  }

  /**
   *
   * @param url public url of file in supabase storage
   * @returns path of file, undefined if url is not valid
   */
  private async extractFilePathFromPublicUrl(url: string): Promise<string | undefined> {
    if (stryMutAct_9fa48("780")) {
      {}
    } else {
      stryCov_9fa48("780");
      if (stryMutAct_9fa48("783") ? url.indexOf(this.BUCKET_URL_PREFIX) === 0 : stryMutAct_9fa48("782") ? false : stryMutAct_9fa48("781") ? true : (stryCov_9fa48("781", "782", "783"), url.indexOf(this.BUCKET_URL_PREFIX) !== 0)) {
        if (stryMutAct_9fa48("784")) {
          {}
        } else {
          stryCov_9fa48("784");
          return undefined;
        }
      }
      const restOfPath = stryMutAct_9fa48("785") ? url : (stryCov_9fa48("785"), url.slice(this.BUCKET_URL_PREFIX.length));
      return restOfPath;
    }
  }
  async upload(file: Buffer | ArrayBuffer, uploadPath: string, mime: string = stryMutAct_9fa48("786") ? "" : (stryCov_9fa48("786"), "text/plain;charset=UTF-8")): Promise<string> {
    if (stryMutAct_9fa48("787")) {
      {}
    } else {
      stryCov_9fa48("787");
      if (stryMutAct_9fa48("790") ? false : stryMutAct_9fa48("789") ? true : stryMutAct_9fa48("788") ? file : (stryCov_9fa48("788", "789", "790"), !file)) throw new Error(stryMutAct_9fa48("791") ? "" : (stryCov_9fa48("791"), "File must have buffer property"));
      const {
        error
      } = await this.supabaseClient.storage.from(this.BUCKET_NAME).upload(uploadPath, file, stryMutAct_9fa48("792") ? {} : (stryCov_9fa48("792"), {
        contentType: mime,
        upsert: stryMutAct_9fa48("793") ? false : (stryCov_9fa48("793"), true)
      }));
      if (stryMutAct_9fa48("795") ? false : stryMutAct_9fa48("794") ? true : (stryCov_9fa48("794", "795"), error)) throw new StorageError(error);
      const response = this.supabaseClient.storage.from(this.BUCKET_NAME).getPublicUrl(uploadPath);
      return response.data.publicUrl;
    }
  }
}
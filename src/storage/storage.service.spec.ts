
import { Test, TestingModule } from "@nestjs/testing";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { SupabaseClient } from "@supabase/supabase-js";
import { StorageModule } from "./storage.module";
import { NestjsFormDataModule } from "nestjs-form-data";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupabaseStorageManager } from "./storage.service";
import { StorageManager } from "./storage.service";
import { StorageApiError } from "@supabase/storage-js";
describe("storage Service", () => {
    let storage: StorageManager;
    let supa: SupabaseClient;
    beforeAll(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports:[ 
    
StorageModule],
            providers: [ {
                provide: StorageManager,
                useValue:{}
            }, SupabaseStorageManager],
        }).compile();
        storage = module.get<StorageManager>(StorageManager);
        supa = module.get<SupabaseClient>(SupabaseClient);
    }, 50000);
    it("should service be defined", () => {
        expect(storage).toBeDefined();
        expect(supa).toBeDefined();
    });
    it("should destroy", async() => {
        jest.spyOn(supa.storage, "emptyBucket").mockImplementation(
            async (id) => {
                return {
                    data: {
                        message: "success",
                    },
                    error: null,
                };
            },
        );
        jest.spyOn(supa.storage, "deleteBucket").mockImplementation(
            async (id) => {
                return {
                    data: {
                        message: "success",
                    },
                    error: null,
                };
            },
        );
       await storage.destroyStorage()
      
    });
    it("should initial", async() => {
        jest.spyOn(supa.storage, "createBucket").mockImplementation(
            async (id) => {
                return {
                    data:Buffer,
                    error: null,
                };
            },
        );
       
       await storage.initiateStorage()
      
    });
  
   
});

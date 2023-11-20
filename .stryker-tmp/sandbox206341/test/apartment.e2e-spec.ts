// @ts-nocheck
import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { ApartmentModule } from "../src/apartment/apartment.module";
import { ApartmentService, ApartmentServiceImp } from "../src/apartment/apartment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdGeneratorModule } from "../src/id-generator/id-generator.module";
import { StorageModule } from "../src/storage/storage.module";
import { Apartment } from "../src/apartment/entities/apartment.entity";
import { ApartmentController } from "../src/apartment/apartment.controller";
import { Resident } from "../src/resident/entities/resident.entity";

describe("Cats", () => {
    let app: INestApplication;
    let catsService = { findAll: () => ["test"] };
    const OLD_ENV = process.env;
    beforeAll(async () => {
        jest.resetModules(); // Most important - it clears the cache
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([Apartment, Resident]),
                IdGeneratorModule,
                StorageModule,
            ],
            controllers: [ApartmentController],
            providers: [
                {
                    provide: ApartmentService,
                    useClass: ApartmentServiceImp,
                },
            ],
            exports: [ApartmentService],
        })
            .overrideProvider(ApartmentService)
            .useValue(catsService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET cats`, () => {
        return request(app.getHttpServer())
            .get("/api/apartment")
            .expect(200)
            .expect({
                data: catsService.findAll(),
            });
    });
});

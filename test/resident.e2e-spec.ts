import { AppModule } from './../src/app.module';
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

describe("ResidentController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async ()     => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should get all resident', () => {
        return request(app.getHttpServer()).get('/resident').expect(200);
    })
});
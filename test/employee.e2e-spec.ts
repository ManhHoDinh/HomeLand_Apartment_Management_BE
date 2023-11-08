import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { EmployeeModule }  from "./../src/employee/employee.module";
describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [EmployeeModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

   it('should create a new user', () => {
        return request(app.getHttpServer()).post('/api/employee').send({
                name:'dinh dai duong',
                date_of_birth: '2003-07-03',
                gender: 'male',
                phone_number: "0326465520",
        })
   });
});

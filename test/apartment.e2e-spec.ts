import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApartmentModule } from '../src/apartment/apartment.module';
import { ApartmentService } from '../src/apartment/apartment.service';

describe('Cats', () => {
  let app: INestApplication;
  let catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApartmentModule],
    })
      .overrideProvider(ApartmentService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/api/apartment')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  
});
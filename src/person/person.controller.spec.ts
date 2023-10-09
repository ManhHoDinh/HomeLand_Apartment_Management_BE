import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonRepository, PersonService } from './person.service';

describe('PersonController', () => {
  let controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [{ provide: PersonRepository, useClass: PersonService }],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { PersonRepository, PersonService } from "./person.service";

describe("PersonService", () => {
    let service: PersonRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: PersonRepository,
                    useClass: PersonService,
                },
            ],
        }).compile();

        service = module.get<PersonRepository>(PersonRepository);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../person/entities/person.entity";
import { Repository } from "typeorm";
import { hashSync } from "bcrypt";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>
    ) {}

    async create(createAccountDto: CreateAccountDto) {
        let person = await this.personRepository.findOne({
            where: { id: createAccountDto.id },
        });
        if (!person) throw new NotFoundException();
        if (!person.password)
            throw new ConflictException("Person profile already has account");
        person.email = createAccountDto.email;
        person.password = hashSync(createAccountDto.password, 13);

        return await this.personRepository.save(person);
    }
}

import { Injectable } from "@nestjs/common";
import { CreatePersonDto } from "../person/dto/create-person.dto";
import { OmitType } from "@nestjs/swagger";
import {
    Admin,
    Employee,
    Manager,
    Person,
    PersonRole,
    Resident,
    Technician,
} from "../person/entities/person.entity";
import { plainToInstance } from "class-transformer";

export class PersonInfo extends OmitType(CreatePersonDto, [
    "back_identify_card_photo",
    "front_identify_card_photo",
]) {}

@Injectable()
export class PersonFactory {
    static create(personInfo: PersonInfo): Person {
        switch (personInfo.role) {
            case PersonRole.ADMIN:
                return plainToInstance(Admin, personInfo);
            case PersonRole.EMPLOYEE:
                return plainToInstance(Employee, personInfo);
            case PersonRole.MANAGER:
                return plainToInstance(Manager, personInfo);
            case PersonRole.RESIDENT:
                return plainToInstance(Resident, personInfo);
            case PersonRole.TECHINICIAN:
                return plainToInstance(Technician, personInfo);
            default:
                throw new Error("Factory unable to create");
        }
    }
}

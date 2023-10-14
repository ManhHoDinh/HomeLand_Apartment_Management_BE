import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Person } from "../../person/entities/person.entity";

@Entity()
export class Apartment {
    @PrimaryColumn()
    apartment_id: string;

    @OneToMany(() => Person, (person) => person.stay_at)
    residents: Person[];
}

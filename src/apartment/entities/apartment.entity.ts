import { Entity, OneToMany } from 'typeorm';
import { Person } from '../../entities/person.entity';

@Entity()
export class Apartment {
    @OneToMany(() => Person, (person) => person.stay_at)
    residents: Person[];
}

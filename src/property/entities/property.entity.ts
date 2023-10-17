import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { Person } from "../../person/entities/person.entity";
import { Contract } from "../../contract/entities/contract.entity";
import { Image } from "../../image/entities/image.entity";
import { Floor } from "../../floor/entities/floor.entity";

@Entity()
export class Property {
    @PrimaryColumn()
    property_id: string;

    @Column()
    width: number;

    @ManyToOne(() => Floor, (floor) => floor.properties)
    floor: Floor;

    @OneToMany(() => Person, (person) => person.stay_at)
    residents: Person[];

    @OneToMany(() => Contract, (contract) => contract.property_id)
    contract: Contract[];

    @OneToMany(() => Image, (image) => image.property)
    images: Image[];

    @Column()
    length: number;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

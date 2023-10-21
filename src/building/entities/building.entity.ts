import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Floor } from "../../floor/entities/floor.entity";
import { Apartment } from "../../apartment/entities/apartment.entity";

@Entity()
export class Building {
    @PrimaryColumn()
    building_id: string;

    @Column()
    name: string;

    @OneToMany(() => Floor, (floor) => floor.building)
    floors: Floor[];

    @OneToMany(() => Apartment, (apartment) => apartment.building)
    apartments: Apartment[];
}

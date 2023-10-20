import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { Person } from "../../person/entities/person.entity";
import { Contract } from "../../contract/entities/contract.entity";
import { Image } from "../../image/entities/image.entity";
import { Floor } from "../../floor/entities/floor.entity";

export enum ApartmentStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}
@Entity()
export class Apartment {
    @PrimaryColumn()
    apartment_id: string;

    @Column()
    width: number;

    @Column()
    length: number;

    @Column({ type: "int" })
    number_of_bedroom: number;

    @Column({ type: "int" })
    number_of_bathroom: number;

    @Column({
        enum: ApartmentStatus,
        default: ApartmentStatus.ACTIVE,
    })
    status: ApartmentStatus;

    @Column()
    description: string;

    @ManyToOne(() => Floor, (floor) => floor.apartments)
    @JoinColumn({ name: "floor_id" })
    floor: Floor;

    @Column({ nullable: true })
    floor_id: string;

    @OneToMany(() => Person, (person) => person.stay_at)
    residents: Person[];

    @OneToMany(() => Contract, (contract) => contract.apartment)
    contract: Contract[];

    @OneToMany(() => Image, (image) => image.apartment)
    images: Image[];

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

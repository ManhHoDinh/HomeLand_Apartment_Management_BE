import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Apartment } from '../apartment/entities/apartment.entity';
import { IsPhoneNumber } from 'class-validator';

export enum PersonType {
    RESIDENT = 'resident',
    ADMIN = 'admin',
    TECHINICIAN = 'technician',
    MANAGER = 'manager',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity()
export class Person {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Apartment, (apartment) => apartment.residents, { nullable: true })
    stay_at?: Apartment;


    @Column(
        {
            type: 'enum',
            enum: PersonType,
        }
    )
    type: PersonType;

    @Column()
    name: string;

    @Column()
    date_of_birth: Date;

    @Column(
        {
            type: 'enum',
            enum: Gender,
        }
    )
    gender: Gender;

    @Column()
    front_identify_card_photo_URL: string;

    @Column()
    back_identify_card_photo_URL: string;

    @IsPhoneNumber('VN')
    @Column()
    phone_number: string

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    email?: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date
}

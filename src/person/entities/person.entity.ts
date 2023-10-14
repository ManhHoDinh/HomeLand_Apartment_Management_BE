import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    TableInheritance,
    ChildEntity,
} from "typeorm";
import { Apartment } from "../../apartment/entities/apartment.entity";
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export enum PersonRole {
    RESIDENT = "resident",
    ADMIN = "admin",
    TECHINICIAN = "technician",
    MANAGER = "manager",
    EMPLOYEE = "employee",
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
}

@Entity()
@TableInheritance({
    column: {
        type: "enum",
        name: "role",
        enum: PersonRole,
    },
})
export class Person {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Apartment, (apartment) => apartment.residents, {
        nullable: true,
        eager: true,
    })
    stay_at?: Apartment;

    @IsEnum(PersonRole)
    @Column({
        type: "enum",
        enum: PersonRole,
    })
    role: PersonRole;

    @ApiProperty({
        example: "Nguyen Van A",
    })
    @IsString()
    @Column()
    name: string;

    @ApiProperty({
        example: "1999-01-01",
    })
    @IsDateString()
    @Column()
    date_of_birth: Date;

    @IsEnum(Gender)
    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;

    @Column()
    front_identify_card_photo_URL: string;

    @Column()
    back_identify_card_photo_URL: string;

    @IsPhoneNumber("VN")
    @Column({
        unique: true,
    })
    phone_number: string;

    @Column({ nullable: true })
    activated_at?: Date;

    @Exclude()
    @IsOptional()
    @Column({ nullable: true })
    password?: string;

    @IsOptional()
    @IsEmail()
    @Column({ nullable: true, unique: true })
    email?: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

@ChildEntity()
export class Resident extends Person {
    @Column({ default: PersonRole.RESIDENT })
    role: PersonRole = PersonRole.RESIDENT;
}

@ChildEntity()
export class Admin extends Person {
    @Column({ default: PersonRole.ADMIN })
    role: PersonRole = PersonRole.ADMIN;
}

@ChildEntity()
export class Manager extends Person {
    @Column({ default: PersonRole.MANAGER })
    role: PersonRole = PersonRole.MANAGER;
}

@ChildEntity()
export class Technician extends Person {
    @Column({ default: PersonRole.TECHINICIAN })
    role: PersonRole = PersonRole.TECHINICIAN;
}

@ChildEntity()
export class Employee extends Person {
    @Column({ default: PersonRole.EMPLOYEE })
    role: PersonRole = PersonRole.EMPLOYEE;
}

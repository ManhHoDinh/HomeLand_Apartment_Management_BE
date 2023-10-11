import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
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
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export enum PersonRole {
    RESIDENT = "resident",
    ADMIN = "admin",
    TECHINICIAN = "technician",
    MANAGER = "manager",
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
}

@Entity()
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

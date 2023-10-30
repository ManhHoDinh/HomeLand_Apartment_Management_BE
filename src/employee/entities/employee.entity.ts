import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
} from "typeorm";
import { Profile } from "../../helper/class/profile.entity";
import { Gender, PersonRole } from "../../helper/class/profile.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from "class-validator";
@Entity()
export class Employee {
    @PrimaryColumn()
    id: string;

    @ApiProperty({
        example: "Nguyen Van A",
    })
    @IsString()
    @Column()
    name: string;

    @ApiProperty({
        default: "1990-01-01",
    })
    @IsDateString()
    @Column()
    date_of_birth: Date;


    @ApiProperty({
        default: Gender.MALE,
        type: "enum",
        enum: Gender,
    })
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

    @ApiProperty({
        default: "0999999999",
    })
    @IsPhoneNumber("VN")
    @Column({ unique: true })
    phone_number: string;

    @Column({ nullable: true })
    activated_at?: Date;

    @ApiProperty({ required: false, default: "admin@gmail.com" })
    @IsOptional()
    @IsEmail()
    @Column({ nullable: true, unique: true })
    email?: string;

    @ApiHideProperty()
    @Column({ nullable: true })
    avatarURL?: string;

    @Column(() => Profile)
    profile: Profile;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

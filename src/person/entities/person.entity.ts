import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Apartment } from '../../apartment/entities/apartment.entity';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { Exclude } from 'class-transformer';

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

const MBtoBytes = (mb: number) => mb * 1000000;

@Entity()
export class Person {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Apartment, (apartment) => apartment.residents, {
    nullable: true,
    eager: true,
  })
  stay_at?: Apartment;

  @IsEnum(PersonType)
  @Column({
    type: 'enum',
    enum: PersonType,
  })
  type: PersonType;

  @IsString()
  @Column()
  name: string;

  @IsDateString()
  @Column()
  date_of_birth: Date;

  @IsEnum(Gender)
  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @IsFile()
  @MaxFileSize(MBtoBytes(15))
  @HasMimeType(['image/jpeg', 'image/png'])
  @Column()
  front_identify_card_photo_URL: string;

  @IsFile()
  @MaxFileSize(MBtoBytes(15))
  @HasMimeType(['image/jpeg', 'image/png'])
  @Column()
  back_identify_card_photo_URL: string;

  @IsPhoneNumber('VN')
  @Column()
  phone_number: string;

  @Exclude()
  @IsOptional()
  @Column({ nullable: true })
  password?: string;

  @IsOptional()
  @IsEmail()
  @Column({ nullable: true })
  email?: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

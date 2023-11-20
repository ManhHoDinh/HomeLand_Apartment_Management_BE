import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { Service } from "../../service/entities/service.entity";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BadRequestException } from "@nestjs/common";

@Entity()
export class ServicePackage {
    @IsString()
    @PrimaryColumn()
    servicePackage_id: string;
    @ApiProperty({ example: "service0" })
    @IsString()
    @Column()
    service_id: string;

    @ManyToOne(() => Service, (service) => service.servicePackages, {
        nullable: true,
    })
    //@JoinColumn({ name: "service_id" })
    service?: Service;
    @IsOptional()
    @Column({ nullable: true })
    expired_date?: Date;
    @ApiProperty({ example: 1 })
    @IsInt()
    @Type(() => Number)
    @Column({ type: "int" })
    @Column()
    per_unit_price: number;
}

import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { Apartment } from "../../apartment/entities/apartment.entity";
import { Floor } from "../../floor/entities/floor.entity";
import { Building } from "../../building/entities/building.entity";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";

export enum EquipmentStatus {
    AVAILABLE = "AVAILABLE",
    NOT_AVAILABLE = "NOT_AVAILABLE",
    MAINTENANCE = "MAINTENANCE",
}

@Entity()
export class Equipment {
    @PrimaryColumn()
    id: string;

    @IsString()
    @Column()
    name: string;

    @IsEnum(EquipmentStatus)
    @Column({
        type: "enum",
        enum: EquipmentStatus,
        default: EquipmentStatus.NOT_AVAILABLE,
    })
    status: EquipmentStatus;

    @Column("simple-array")
    imageURLs: string[];

    @ApiProperty({ required: false, example: faker.lorem.lines(1) })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => Apartment, (apartment) => apartment.equipments)
    @JoinColumn({ name: "apartment_id" })
    apartment?: Apartment;

    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    apartment_id?: string;

    @ManyToOne(() => Floor, (floor) => floor.equipments)
    @JoinColumn({ name: "floor_id" })
    floor?: Floor;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    floor_id?: string;

    @ManyToOne(() => Building, (building) => building.equipments)
    @JoinColumn({ name: "building_id" })
    building?: Building;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    building_id?: string;

    @BeforeInsert()
    @BeforeUpdate()
    checkFK() {
        let array = [this.apartment_id, this.floor_id, this.building_id];
        let count = 0;
        array.forEach((element) => {
            if (element) count++;
        });
        if (count != 1) {
            throw new BadRequestException(
                "Equipment must have exactly one of apartment_id, floor_id, building_id",
            );
        }
    }
}

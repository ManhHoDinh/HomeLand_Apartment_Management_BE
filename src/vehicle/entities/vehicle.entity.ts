import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    Index,
    JoinColumn,
} from "typeorm";
import { Resident } from "../../resident/entities/resident.entity";
import { IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

enum status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

@Index(["licensePlate", "residentId"], { unique: true })
@Entity()
export class Vehicle {
    @PrimaryColumn()
    id: string;

    @ApiProperty({ example: "Xanh" })
    @IsString()
    @Column()
    color: string;

    @Column({ name: "license_plate" })
    licensePlate: string;

    @Column({ name: "front_registration_photo_url" })
    frontRegistrationPhotoURL: string;

    @Column({ name: "back_registration_photo_url" })
    backRegistrationPhotoURL: string;

    @Column({ name: "license_plate_photo_url" })
    licensePlatePhotoURL: string;

    @ManyToOne(() => Resident, (resident) => resident.vehicles)
    @JoinColumn({ name: "resident_id" })
    resident: Resident;

    @IsString()
    @Column({ name: "resident_id" })
    residentId: string;

    @ApiProperty({ enum: status })
    @IsEnum(status)
    @Column({ enum: status, default: status.PENDING })
    status: status;
}

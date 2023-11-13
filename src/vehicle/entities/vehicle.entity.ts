import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    Index,
    JoinColumn,
} from "typeorm";
import { Resident } from "../../resident/entities/resident.entity";

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

    @Column({ name: "resident_id" })
    residentId: string;

    @Column({ enum: status, default: status.PENDING })
    status: status = status.PENDING;

    @BeforeUpdate()
    @BeforeInsert()
    checkForResident() {
        if (!this.residentId) throw new Error("Resident id must not be null");
    }
}

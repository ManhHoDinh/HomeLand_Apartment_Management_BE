import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "../../apartment/entities/apartment.entity";
import { Resident } from "../../resident/entities/resident.entity";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    contract_id: string;

    @OneToOne(() => Contract, (contract) => contract.contract_id, {
        nullable: true,
    })
    @JoinColumn()
    previous_contract?: Contract | null;

    @OneToOne(() => Contract, (contract) => contract.contract_id, {
        nullable: true,
    })
    @JoinColumn()
    next_contract?: Contract | null;

    @ManyToOne(() => Resident, (resident) => resident.contracts)
    @JoinColumn({ name: "resident_id" })
    resident: Resident;
    @Column({ nullable: true })
    resident_id: string;

    @ManyToOne(() => Apartment, (apartment) => apartment.contract)
    @JoinColumn({ name: "apartment_id" })
    apartment: Apartment;

    @Column({ nullable: true })
    apartment_id: string;

    @CreateDateColumn()
    created_at: Date;

    
    @Column({nullable:true})
    expire_at: Date;
    @DeleteDateColumn()
    deleted_at?: Date;
}

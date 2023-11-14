import { IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Service } from "../../service/entities/service.entity";

@Entity()
export class ServicePackage {
    @IsString()
    @PrimaryColumn()
    id: string;
    @Column()
    service_id: string;
    @ManyToOne(() => Service, (service) => service.servicePackages)
    service: Service;
    @Column()
    expired_date: number;
    @Column()
    per_unit_price: number;
}

import {
    Column,
    Entity,
    PrimaryColumn,
    OneToOne,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    OneToMany
} from "typeorm";
import { PersonRole, Profile } from "../../helper/class/profile.entity";
import { Account } from "../../account/entities/account.entity";
import { JoinColumn, JoinTable } from "typeorm";
import { Task } from "src/task/entities/task.entity";
import { RepairInvoice } from "src/repairInvoice/entities/repairInvoice.entity";


@Entity()
export class Technician {
    @PrimaryColumn()
    id: string;

    @Column(() => Profile)
    profile: Profile;

    @OneToOne(() => Account, {
        nullable: true,
        cascade: true,
    })
    @JoinColumn()
    account?: Account;

    @OneToMany(() => Task, (task) => task.assignee)
    @JoinColumn()
    tasks: Task[];

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    role = PersonRole.TECHNICIAN;
}

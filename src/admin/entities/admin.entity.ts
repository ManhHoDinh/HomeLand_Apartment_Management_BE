import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { Profile } from "../../helper/class/profile.entity";
import { Account } from "../../account/entities/account.entity";

@Entity()
export class Admin {
    @PrimaryColumn()
    id: string;

    @Column(() => Profile)
    profile: Profile;

    @OneToOne(() => Account, {
        nullable: true,
        cascade: true,
    })
    @JoinColumn({ name: "account_id" })
    account?: Account;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { PersonRole, Profile } from "../../helper/class/profile.entity";
import { Account } from "../../helper/class/account.entity";

@Entity()
export class Manager {
    @PrimaryColumn()
    id: string;

    @Column(() => Profile)
    profile: Profile;

    @OneToOne(() => Account, (Account) => Account.manager, { nullable: true })
    @JoinColumn({ name: "account_id" })
    account?: Account;

    @Column({ nullable: true })
    account_id?: string;

    role: PersonRole = PersonRole.MANAGER;
}

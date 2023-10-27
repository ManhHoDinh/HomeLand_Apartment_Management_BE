import { Column, Entity, PrimaryColumn } from "typeorm";
import { Profile } from "../../helper/class/profile.entity";
import { Account } from "../../helper/class/account.entity";

@Entity()
export class Admin {
    @PrimaryColumn()
    id: string;

    @Column(() => Profile)
    profile: Profile;

    @Column(() => Account)
    account: Account;
}

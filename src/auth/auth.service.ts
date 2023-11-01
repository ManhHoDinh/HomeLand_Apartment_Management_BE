import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../hash/hash.service";
import { SignInDto } from "./dto/signin.dto";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { PersonRole } from "../helper/class/profile.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
import { Resident } from "../resident/entities/resident.entity";
import { Admin } from "../admin/entities/admin.entity";
import { DataSource, Repository } from "typeorm";
import { Account } from "../account/entities/account.entity";

export class TokenPayload {
    id: string;
}

export abstract class AuthService {
    abstract signIn(
        signInDto: SignInDto,
        expiresIn?: string,
    ): Promise<{ access_token: string; role: PersonRole }>;
    abstract findOwnerByAccountEmail(
        email: string,
    ): Promise<Admin | Manager | Technician | Resident | null>;

    abstract findOwnerById(
        id: string,
    ): Promise<Admin | Manager | Technician | Resident | null>;
}
@Injectable()
export class AuthServiceImp extends AuthService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
    ) {
        super();
    }

    async signIn(signInDto: SignInDto, expiresIn: string = "30d") {
        let person = await this.findOwnerByAccountEmail(signInDto.email);
        console.log(person);
        if (
            !person ||
            !person.account ||
            !this.hashService.isMatch(
                signInDto.password,
                person.account.password,
            )
        ) {
            throw new UnauthorizedException("Wrong email or password");
        }
        const payload: TokenPayload = {
            id: person.id,
        };
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn,
            }),
            role: person.role,
        };
    }

    async findOwnerByAccountEmail(
        email: string,
    ): Promise<Admin | Manager | Technician | Resident | null> {
        const account = await this.accountRepository.findOne({
            where: { email },
            relations: {
                admin: {
                    account: true,
                },
                resident: {
                    account: true,
                },
                technician: {
                    account: true,
                },
                manager: {
                    account: true,
                },
            },
        });

        if (!account) return null;

        return (
            account.resident ||
            account.admin ||
            account.technician ||
            account.manager ||
            null
        );
    }

    async findOwnerById(
        id: string,
    ): Promise<Admin | Manager | Technician | Resident | null> {
        const account = await this.accountRepository.findOne({
            where: { owner_id: id },
        });

        if (!account) return null;

        return (
            account.resident ||
            account.admin ||
            account.technician ||
            account.manager ||
            null
        );
    }
}

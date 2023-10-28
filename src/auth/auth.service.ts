import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../hash/hash.service";
import { SignInDto } from "./dto/signin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
import { Resident } from "../resident/entities/resident.entity";
import { Repository } from "typeorm";
import { Account } from "../account/entities/account.entity";
import { Admin } from "../admin/entities/admin.entity";
import { PersonRole } from "../helper/class/profile.entity";

export class TokenPayload {
    id: string;
}

export abstract class AuthService {
    abstract signIn(
        signInDto: SignInDto,
        expiresIn?: string,
    ): Promise<{ access_token: string; role: PersonRole }>;
    abstract findAccountOwnerByEmail(
        email: string,
    ): Promise<Admin | Manager | Technician | Resident | null>;

    abstract findAccountOwnerById(
        id: string,
    ): Promise<Admin | Manager | Technician | Resident | null>;
}
@Injectable()
export class AuthServiceImp extends AuthService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
    ) {
        super();
    }

    async signIn(signInDto: SignInDto, expiresIn: string = "30d") {
        const person = await this.findAccountOwnerByEmail(signInDto.email);
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
            role: PersonRole.ADMIN,
        };
    }

    async findAccountOwnerByEmail(
        email: string,
    ): Promise<Admin | Manager | Technician | Resident | null> {
        const account = await this.accountRepository.findOne({
            where: { email },
        });
        if (!account) return null;
        return (
            account.admin ||
            account.manager ||
            account.technician ||
            account.resident ||
            null
        );
    }

    async findAccountOwnerById(
        id: string,
    ): Promise<Admin | Manager | Technician | Resident | null> {
        const account = await this.accountRepository.findOne({
            where: { id },
        });
        if (!account) return null;
        return (
            account.admin ||
            account.manager ||
            account.technician ||
            account.resident ||
            null
        );
    }
}

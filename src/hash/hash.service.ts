import { Injectable } from "@nestjs/common";
import { compareSync, hashSync } from "bcrypt";
import { hashRounds } from "../helper/constant";

export abstract class HashService {
    abstract hash(value: string): string;
    abstract isMatch(value: string, hash: string): boolean;
}

@Injectable()
export class BcryptHash extends HashService {
    hash(value: string): string {
        return hashSync(value, hashRounds);
    }

    isMatch(value: string, hash: string): boolean {
        return compareSync(value, hash);
    }
}

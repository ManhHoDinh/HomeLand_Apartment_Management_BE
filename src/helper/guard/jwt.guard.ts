import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { PersonRepository } from "../../person/person.service";
import { TokenPayload } from "../../auth/auth.controller";
import { TokenExpiredError } from "jsonwebtoken";

@Injectable()
export class JWTAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly personRepository: PersonRepository,
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any): Promise<boolean> {
        if (request.headers.authorization) {
            const token = request.headers.authorization.split(" ")[1];
            if (token) {
                try {
                    const payload: TokenPayload =
                        this.jwtService.verify(token);
                    const user = await this.personRepository.findOne(
                        payload.id,
                    );
                    if (!user) return false;
                    request.user = user;
                    return true;
                } catch (error) {
                    if (error instanceof TokenExpiredError) {
                        throw new UnauthorizedException(
                            "Token expired",
                        );
                    }
                    throw false;
                }
            }
        }
        return false;
    }
}

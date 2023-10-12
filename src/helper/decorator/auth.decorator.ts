import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { JWTAuthGuard } from "../guard/jwt.guard";
import { RolesGuard } from "../guard/role.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function Auth(...auth: string[]) {
    return applyDecorators(
        Roles(auth),
        UseGuards(JWTAuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: "Unauthorized" })
    );
}

import { Controller, Get, Req } from "@nestjs/common";
import { Auth } from "../helper/decorator";

@Auth()
@Controller("me")
export class MeController {
    @Get()
    findAll(@Req() req: any) {
        return;
    }
}

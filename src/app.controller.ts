import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "./helper/decorator/auth.decorator";
import { StorageManager } from "./storage/storage.service";

@ApiTags("DEVELOPMENT ONLY")
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly storageManager: StorageManager,
    ) {}

    @Auth()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("/test")
    async listPath() {
        return await this.storageManager.listAllFiles("/equipment");
    }
}

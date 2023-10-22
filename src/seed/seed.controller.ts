import {
    Controller,
    Post,
    InternalServerErrorException,
} from "@nestjs/common";
import { SeedService } from "./seed.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UploadService } from "../upload/upload.service";

@ApiTags("DEVELOPMENT ONLY")
@Controller("/seed")
export class SeedController {
    constructor(
        private readonly seedService: SeedService,
        private readonly uploadService: UploadService,
    ) {}

    /**
     * @deprecated 
     * this endpoint is deprecated, use `/seed/create` `/seed/drop` `/seed/seeding` instead
     * __WARNING__: this endpoint should be run in empty database.
     *  Otherwise, it will cause
     * <span style="color: red;"> server crash or duplicate/corrupted data</span>.
     *
     * _Created resources include:_
     *
     * __PERSOIN__
     * | Role | Email | Password |
     * |-|-|-|
     * |ADMIN|`admin@gmail.com`|`password`|
     * |RESIDENT|`resident@gmail.com`|`password`|
     * |MANAGER|`manager@gmail.com`|`password`|
     * |TECHNICIAN|`technician@gmail.com`|`password`|
     * |EMPLOYEE|`employee@gmail.com`|`password`|
     * ---
     *
     * __BUILDING__
     * |Building_id|Building_name|
     * |-|-|
     * |BLD0|Building 0|
     * ---
     *
     * __FLOOR__
     * |Floor_id|Floor_name|Building_id|
     * |-|-|-|
     * |FLR0|Floor 0|BLD0|
     * ---
     *
     */
    @ApiOperation({ summary: "Create seed data" })
    @Post()
    startSeeding() {
        return this.seedService.startSeeding();
    }

    /**
     * Create empty database
     */
    @Post("/create")
    async createDB() {
        await this.uploadService.createBucket();
        return await this.seedService.createDatabase();
    }

    /**
     * Drop the database and data
     */

    @Post("/drop")
    async dropDB() {
        try {
            await this.uploadService.removeBucket();
            return await this.seedService.dropDatabase();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Create:
     * - 200 persons, all have the same password `password`
     * - 5 buildings, each have 10 floors, each floor have 8 rooms
     */
    @Post("/seeding")
    async seeding() {
        await this.seedService.seeding();
    }
}

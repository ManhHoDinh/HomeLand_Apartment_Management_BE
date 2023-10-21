import { Controller, Post } from "@nestjs/common";
import { SeedingService } from "./seeding.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("DEVELOPMENT ONLY")
@Controller("/seeding")
export class SeedingController {
    constructor(private readonly seedingService: SeedingService) {}

    /**
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
     * __APARTMENT__
     * |Apartment_id|Floor_id|Building_id|
     * |-|-|-|
     * |APM000000|FLR0|BLD0|
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
        return this.seedingService.startSeeding();
    }
}

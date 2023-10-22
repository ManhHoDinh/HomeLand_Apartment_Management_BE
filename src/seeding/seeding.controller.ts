import { Controller, Delete, Post } from "@nestjs/common";
import { SeedService } from "./seeding.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteDateColumn } from "typeorm";

@ApiTags("DEVELOPMENT ONLY")
@Controller("/seed")
export class Seed {
    constructor(private readonly seedService: SeedService) {}

    @ApiOperation({ summary: "Create seed data" })
    @Post()
    startSeeding() {
        return this.seedService.startSeeding();
    }

    @ApiOperation({ summary: "Create database" })
    @Post("/create")
    async createDB() {
        return await this.seedService.createDB();
    }

    @ApiOperation({ summary: "Drop database" })
    @Delete("/drop")
    async dropDB() {
        return await this.seedService.dropDB();
    }
}

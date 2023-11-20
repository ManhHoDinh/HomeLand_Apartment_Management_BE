// @ts-nocheck
import { Repository } from "typeorm";
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    NotFoundException,
    Query,
    Delete,
} from "@nestjs/common";

import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FormDataRequest } from "nestjs-form-data";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { BuildingService, TypeORMBuildingService } from "./building.service";
import { id_ID } from "@faker-js/faker";

@ApiTags("Building")
@Controller("building")
export class BuildingController {
    constructor(private readonly buildingRepository: TypeORMBuildingService) {}
    @ApiConsumes("multipart/form-data")
    @Post()
    @FormDataRequest()
    create(@Body() createBuildingDto: CreateBuildingDto) {
        return this.buildingRepository.create(createBuildingDto);
    }
    // search building
    /**
     * search building by name
     * @param query string that admin search by name
     */
    @Get("search")
    async searchBuilding(@Query("query") query: string) {
        const result = await this.buildingRepository.search(query);
        return result;
    }
    @ApiQuery({
        name: "page",
        required: false,
        description:
            "Page number: Page indexed from 1, each page contain 30 items, if null then return all.",
    })
    @Get()
    findAll() {
        return this.buildingRepository.findAll();
    }
    @Get(":id")
    async findOne(@Param("id") id: string) {
        try {
            const building = await this.buildingRepository.findOne(id);
            if (building) return building;
        }
        catch(e) {
            throw new Error("Building not found");
        }
        
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateBuildingDto: UpdateBuildingDto,
    ) {
        try {
            const result = await this.buildingRepository.update(
                id,
                updateBuildingDto,
            );
            return result;
        } catch(e) {
            throw new Error("Building not found");

        }
    }
    @Delete("/:id")
    async softDeleteBuilding(@Param("id") id: string) {
        try {
            const result = await this.buildingRepository.delete(id);
            return result;
        }
        catch (error) {
            throw new Error("Building not found to delete");
            
        }
    }
}

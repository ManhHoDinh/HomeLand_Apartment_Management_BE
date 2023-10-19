import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
} from "@nestjs/common";
import { ApartmentService } from "./apartment.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Apartment")
@Controller("apartment")
export class ApartmentController {
    constructor(private readonly propertyService: ApartmentService) {}

    @Post()
    create(@Body() createPropertyDto: CreateApartmentDto) {
        return this.propertyService.create(createPropertyDto);
    }

    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        const property = await this.propertyService.findOne(id);
        if (property) return property;
        throw new NotFoundException("Property not found");
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updatePropertyDto: UpdateApartmentDto,
    ) {
        const result = await this.propertyService.update(
            id,
            updatePropertyDto,
        );
        if (result) return { msg: "Property updated" };
        throw new NotFoundException("Property not found");
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        const result = await this.propertyService.softDelete(id);
        if (result) return { msg: "Property deleted" };
        throw new NotFoundException("Property not found");
    }
}

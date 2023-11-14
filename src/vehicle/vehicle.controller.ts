import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { createVehicleDto } from "./dto/create-vehicle.dto";
import { VehicleService } from "./vehicle.service";
import { FormDataRequest } from "nestjs-form-data";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PersonRole } from "../helper/class/profile.entity";
import { Auth } from "../helper/decorator/auth.decorator";

@ApiTags("vehicle")
@Auth(PersonRole.RESIDENT, PersonRole.MANAGER, PersonRole.ADMIN)
@Controller("vehicle")
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Post("/")
    @FormDataRequest()
    @ApiConsumes("multipart/form-data")
    createVehicle(@Body() createVehicleDto: createVehicleDto) {
        return this.vehicleService.createVehicle(createVehicleDto);
    }

    @Get("/")
    getAllVehicle() {
        return this.vehicleService.getAllVehicle();
    }

    @Delete("/:licensePlate")
    async deleteVehicle(@Param("licensePlate") plateNumber: string) {
        await this.vehicleService.deleteVehicle(plateNumber);
    }
}

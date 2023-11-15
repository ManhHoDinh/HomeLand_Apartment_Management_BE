import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { VehicleService } from "./vehicle.service";
import { FormDataRequest } from "nestjs-form-data";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PersonRole } from "../helper/class/profile.entity";
import { Auth } from "../helper/decorator/auth.decorator";
import { User } from "../helper/decorator/user.decorator";
import { AccountOwner } from "../auth/auth.service";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Resident } from "../resident/entities/resident.entity";

@ApiTags("vehicle")
@Controller("vehicle")
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Auth(PersonRole.RESIDENT, PersonRole.MANAGER, PersonRole.ADMIN)
    @Post("/")
    @FormDataRequest()
    @ApiConsumes("multipart/form-data")
    async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
        return await this.vehicleService.createVehicle(createVehicleDto);
    }

    /**
     *  Get all vehicle:
     * - If the user is a `resident`, return all vehicle of that resident
     * - If the user is a `manager` or admin, return all vehicle
     * @param user user fetched from the token
     * @returns
     */
    @Auth(PersonRole.RESIDENT, PersonRole.MANAGER, PersonRole.ADMIN)
    @Get("/")
    async getAllVehicle(@User() user: AccountOwner | null) {
        if (user?.role === PersonRole.RESIDENT) {
            return await this.vehicleService.getAllVehicleByResidentId(user.id);
        }
        return await this.vehicleService.getAllVehicle();
    }

    @Auth(PersonRole.MANAGER, PersonRole.ADMIN)
    @Patch("/:id")
    async updateVehicle(
        @Param("id") id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return await this.vehicleService.updateVehicleById(
            id,
            updateVehicleDto,
        );
    }

    @Auth(PersonRole.RESIDENT, PersonRole.MANAGER, PersonRole.ADMIN)
    @Delete("/:id")
    async deleteVehicle(@User() user: AccountOwner, @Param("id") id: string) {
        if (user?.role === PersonRole.RESIDENT) {
            const residentVehicles =
                await this.vehicleService.getAllVehicleByResidentId(user.id);
            if (!residentVehicles.find((vehicle) => vehicle.id === id))
                throw new NotFoundException("Vehicle not found");
        }
        await this.vehicleService.deleteVehicleById(id);
    }
}

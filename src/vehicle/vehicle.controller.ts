import {
    Body,
    Controller,
    Delete,
    Get,
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

@ApiTags("vehicle")
@Auth(PersonRole.RESIDENT, PersonRole.MANAGER, PersonRole.ADMIN)
@Controller("vehicle")
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

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
        console.log(updateVehicleDto);
        return await this.vehicleService.updateVehicleById(
            id,
            updateVehicleDto,
        );
    }

    @Delete("/:id")
    async deleteVehicle(@Param("id") id: string) {
        await this.vehicleService.deleteVehicleById(id);
    }
}

import {
    Injectable,
    NotFoundException,
    NotImplementedException,
} from "@nestjs/common";
import { createVehicleDto } from "./dto/create-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PlateOCRService } from "../plate-ocr/plate-ocr.service";
import { StorageManager } from "../storage/storage.service";
import { ResidentService } from "../resident/resident.service";
import { Resident } from "../resident/entities/resident.entity";

export abstract class VehicleService {
    abstract getAllVehicle(): Promise<Vehicle[]>;
    abstract createVehicle(
        createVehicleDto: createVehicleDto,
    ): Promise<Vehicle>;
    abstract deleteVehicle(plateNumber: string): Promise<void>;
}

@Injectable()
export class VehicleServiceImp implements VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepostiory: Repository<Vehicle>,
        @InjectRepository(Resident)
        private readonly residentService: Repository<Resident>,
        private readonly plateOCRService: PlateOCRService,
        private readonly storageService: StorageManager,
    ) {}

    async getAllVehicle(): Promise<Vehicle[]> {
        return await this.vehicleRepostiory.find();
    }

    async createVehicle(createVehicleDto: createVehicleDto): Promise<Vehicle> {
        const licensePlate = await this.plateOCRService.getPlateNumberFromImage(
            createVehicleDto.licensePlate.buffer,
        );

        const resident = await this.residentService.findOne({
            where: { id: createVehicleDto.residentId },
        });

        if (!resident) throw new NotFoundException("Resident not found");

        const frontRegistrationPhotoURL = await this.storageService.upload(
            createVehicleDto.frontRegistrationPhoto.buffer,
            `vehicle/${resident.id}/front-registration-photo`,
            createVehicleDto.frontRegistrationPhoto.mimeType,
        );

        const backRegistrationPhotoURL = await this.storageService.upload(
            createVehicleDto.backRegistrationPhoto.buffer,
            `vehicle/${resident.id}/front-registration-photo`,
            createVehicleDto.backRegistrationPhoto.mimeType,
        );

        const licensePlatePhotoURL = await this.storageService.upload(
            createVehicleDto.licensePlate.buffer,
            `vehicle/${resident.id}/front-registration-photo`,
            createVehicleDto.licensePlate.mimeType,
        );

        return await this.vehicleRepostiory.save({
            residentId: resident.id,
            licensePlate: licensePlate,
            backRegistrationPhotoURL: backRegistrationPhotoURL,
            frontRegistrationPhotoURL: frontRegistrationPhotoURL,
            licensePlatePhotoURL: licensePlatePhotoURL,
        });
        throw new NotImplementedException();
    }

    async deleteVehicle(licensePlate: string): Promise<void> {
        await this.vehicleRepostiory.delete(licensePlate);
    }
}

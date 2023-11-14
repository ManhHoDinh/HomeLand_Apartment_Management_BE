import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
    NoPlateDetectedError,
    PlateOCRService,
} from "../plate-ocr/plate-ocr.service";
import { StorageManager } from "../storage/storage.service";
import { Resident } from "../resident/entities/resident.entity";
import { IdGenerator } from "../id-generator/id-generator.service";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

export abstract class VehicleService {
    abstract getAllVehicle(): Promise<Vehicle[]>;
    abstract createVehicle(
        createVehicleDto: CreateVehicleDto,
    ): Promise<Vehicle>;
    abstract deleteVehicleById(id: string): Promise<void>;
    abstract getAllVehicleByResidentId(residentId: string): Promise<Vehicle[]>;
    abstract updateVehicleById(
        id: string,
        updateVehicleDto: UpdateVehicleDto,
    ): Promise<Vehicle>;
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
        private readonly idGenerator: IdGenerator,
    ) {}

    async getAllVehicle(): Promise<Vehicle[]> {
        return await this.vehicleRepostiory.find();
    }

    async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const resident = await this.residentService.findOne({
            where: { id: createVehicleDto.residentId },
        });

        if (!resident) throw new NotFoundException("Resident not found");

        const [data, error] =
            await this.plateOCRService.getPlateNumberFromImage(
                createVehicleDto.licensePlate.buffer,
            );

        if (error instanceof NoPlateDetectedError)
            throw new BadRequestException("Not plate detected in the image");

        if (error) throw error;

        const {
            backRegistrationPhoto,
            frontRegistrationPhoto,
            licensePlate,
            ...rest
        } = createVehicleDto;

        let vehicle = this.vehicleRepostiory.create(rest);
        vehicle.id = "VHC" + this.idGenerator.generateId();
        if (!data)
            throw new BadRequestException("Not plate detected in the image");

        vehicle.licensePlate = data;

        vehicle.frontRegistrationPhotoURL = await this.storageService.upload(
            frontRegistrationPhoto.buffer,
            `vehicle/${resident.id}/front_registration_photo`,
            frontRegistrationPhoto.mimeType,
        );

        vehicle.backRegistrationPhotoURL = await this.storageService.upload(
            backRegistrationPhoto.buffer,
            `vehicle/${resident.id}/back_registration_photo`,
            backRegistrationPhoto.mimeType,
        );

        vehicle.licensePlatePhotoURL = await this.storageService.upload(
            licensePlate.buffer,
            `vehicle/${resident.id}/license_plate_photo`,
            licensePlate.mimeType,
        );

        return await this.vehicleRepostiory.save(vehicle);
    }

    async deleteVehicleById(id: string): Promise<void> {
        await this.vehicleRepostiory.delete(id);
    }

    async getAllVehicleByResidentId(residentId: string): Promise<Vehicle[]> {
        return await this.vehicleRepostiory.find({
            where: {
                residentId: residentId,
            },
        });
    }

    async updateVehicleById(
        id: string,
        updateVehicleDto: UpdateVehicleDto,
    ): Promise<Vehicle> {
        const vehicle = await this.vehicleRepostiory.preload({
            id,
            ...updateVehicleDto,
        });

        if (!vehicle) throw new NotFoundException("Vehicle not found");
        return await this.vehicleRepostiory.save(vehicle);
    }
}

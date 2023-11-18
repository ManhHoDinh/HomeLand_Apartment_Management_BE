import { IdGenerator } from "../id-generator/id-generator.service";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, In, Repository, Like } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StorageManager } from "../storage/storage.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { Floor } from "./entities/floor.entity";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { isQueryAffected } from "../helper/validation";
import { Building } from "src/building/entities/building.entity";
import { CreateBuildingDto } from "src/building/dto/create-building.dto";
import { BuildingController } from "src/building/building.controller";
import { Apartment } from "src/apartment/entities/apartment.entity";
export abstract class FloorService implements IRepository<Floor> {
    abstract findOne(id: string): Promise<Floor | null>;
    abstract update(id: string, updateEntityDto: any): Promise<boolean>;
    /**
     *
     * @param createPropertyDto
     * @param id optional id of the apartment
     */
    abstract delete(id: string): Promise<boolean>;
    abstract create(
        createPropertyDto: CreateFloorDto,
        id?: string,
    ): Promise<Floor>;

    abstract findAll(page?: number): Promise<Floor[]>;
    abstract search(query: string): Promise<Floor[]>;
}

@Injectable()
export class TypeORMFloorService extends FloorService {
    constructor(
       
        @InjectRepository(Apartment)
        private readonly apartmentRepository: Repository<Apartment>,
        @InjectRepository(Floor)
        private readonly floorRepository: Repository<Floor>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly idGenerate: IdGenerator,
        private readonly storageManager: StorageManager,
    ) {
        super();
    }

    async create(
        CreateFloorDto: CreateFloorDto,
        id?: string,
    ): Promise<Floor> {
        let floor = this.floorRepository.create(CreateFloorDto);
      
        floor.floor_id = "FL" + this.idGenerate.generateId();
        if (id) floor.floor_id = id;

        try {
            if (CreateFloorDto.apartmentIds) {
                const apartments = await this.apartmentRepository.find({
                    where: { apartment_id: In(CreateFloorDto.apartmentIds) },
                });
                if (apartments.length !== CreateFloorDto.apartmentIds.length)
                    throw new NotFoundException("Some resident not found");
             
                floor.apartments = apartments;
            }
            floor = await this.floorRepository.save(floor);
            return floor;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findAll() {
        return await this.floorRepository.find();
    }

    async findOne(id: string) {
        return await this.floorRepository.findOne({
            where: { floor_id: id },
        });
    }

    async update(
        id: string,
        updateFloorDto: UpdateFloorDto,
    ): Promise<boolean> {
        try {
            let result = await this.floorRepository.update(
                id,
                updateFloorDto,
            );
            return isQueryAffected(result);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.floorRepository.softDelete({
                floor_id: id,
            });
            return isQueryAffected(result);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    /**
     *
     * @param query chuỗi cần tìm theo tên
     * @returns
     */
    async search(query: string): Promise<Floor[]> {
        const result = await this.floorRepository.find({
            where: {
                name: Like(`%${query}%`),
            },
        });
        return result;
    }
}

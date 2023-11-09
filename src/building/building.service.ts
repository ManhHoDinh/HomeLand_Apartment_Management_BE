import { IdGenerator } from "../id-generator/id-generator.service";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository, Like } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StorageManager } from "../storage/storage.service";
import { Building } from "./entities/building.entity";
import { Floor } from "../floor/entities/floor.entity";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { isQueryAffected } from "../helper/validation";
export abstract class BuildingService implements IRepository<Building> {
    abstract findOne(id: string): Promise<Building | null>;
    abstract update(id: string, updateEntityDto: any): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    abstract create(
        createBuildingDto: CreateBuildingDto,
        id?: string,
    ): Promise<Building>;

    abstract findAll(page?: number): Promise<Building[]>;
    abstract search(query: string): Promise<Building[]>;
}

@Injectable()
export class TypeORMBuildingService extends BuildingService {
    constructor(
        @InjectRepository(Building)
        private readonly buildingRepository: Repository<Building>,
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
        createBuildingDto: CreateBuildingDto,
        id?: string,
    ): Promise<Building> {
        let building = this.buildingRepository.create(createBuildingDto);
        building.building_id = "BD" + this.idGenerate.generateId();
        if (id) building.building_id = id;

        try {
            building = await this.buildingRepository.save(building);
            return building;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findAll() {
        return await this.buildingRepository.find();
    }

    async findOne(id: string) {
        return await this.buildingRepository.findOne({
            where: { building_id: id },
        });
    }

    async update(
        id: string,
        updateBuildingDto: UpdateBuildingDto,
    ): Promise<boolean> {
        try {
            let result = await this.buildingRepository.update(
                id,
                updateBuildingDto,
            );
            return isQueryAffected(result);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.buildingRepository.softDelete({
                building_id: id,
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
    async search(query: string): Promise<Building[]> {
        const result = await this.buildingRepository.find({
            where: {
                name: Like(`%${query}%`),
            },
        });
        return result;
    }
}

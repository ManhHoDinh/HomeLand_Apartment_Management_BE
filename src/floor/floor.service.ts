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
export abstract class FloorService implements IRepository<Floor> {
    abstract findOne(id: string): Promise<Floor | null>;
    abstract update(id: string, updateEntityDto: any): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    abstract create(
        createBuildingDto: CreateFloorDto,
        id?: string,
    ): Promise<Floor>;

    abstract findAll(page?: number): Promise<Floor[]>;
    abstract search(query: string): Promise<Floor[]>;
}

@Injectable()
export class TypeORMFloorService extends FloorService {
    constructor(
        @InjectRepository(Floor)
        private readonly buildingRepository: Repository<Floor>,
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
        createBuildingDto: CreateFloorDto,
        id?: string,
    ): Promise<Floor> {
        let floor = this.floorRepository.create(CreateFloorDto);
        floor.floor_id = "FL" + this.idGenerate.generateId();
        if (id) floor.floor_id = id;

        try {
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
            where: { building_id: id },
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
    async search(query: string): Promise<Floor[]> {
        const result = await this.floorRepository.find({
            where: {
                name: Like(`%${query}%`),
            },
        });
        return result;
    }
}

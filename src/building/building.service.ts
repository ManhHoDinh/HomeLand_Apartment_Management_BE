import { IdGenerator } from "../id-generator/id-generator.service";
import { CreateBuildingDto } from "./dto/create-building.dto";
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { DataSource, In, Repository, Like } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StorageManager } from "../storage/storage.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { Building } from "./entities/building.entity";
import { Floor } from "../floor/entities/floor.entity";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { isQueryAffected } from "../helper/validation";
export abstract class BuildingService implements IRepository<Building> {
    abstract findOne(id: string): Promise<Building | null>;
    abstract update(id: string, updateEntityDto: any);
    abstract delete(id: string);
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

        private readonly idGenerate: IdGenerator,
    ) {
        super();
    }

    async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
        let building = this.buildingRepository.create(createBuildingDto);
        building.building_id = "BD" + this.idGenerate.generateId();
        console.log(building);
        try {
            return await this.buildingRepository.save(building);
        } catch (error) {
            throw  new BadRequestException("Create fail");
        }
    }
    async findAll() {
        const allBuilding = await this.buildingRepository.find({});
        return allBuilding;
    }

    async findOne(id: string) {
        const building = await this.buildingRepository.findOne({
            where: { building_id: id },
        });
        return building;
    }

    async update(id: string, updateBuildingDto: UpdateBuildingDto) {
        try {
            let result = await this.buildingRepository.update(
                id,
                updateBuildingDto,
            );
            return result;
        } catch (error) {
            throw new BadRequestException("Id not found.");
        }
    }
    async delete(id: string) {
        try {
            const result = await this.buildingRepository.softDelete({
                building_id: id,
            });
            return result;
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

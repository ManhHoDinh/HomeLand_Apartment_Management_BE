import { isArray } from 'class-validator';
import { IdGenerator } from "src/id-generator/id-generator.service";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, In, Repository, Like } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StorageManager } from "../storage/storage.service";
import { IRepository } from "../helper/interface/IRepository.interface";
import { Building } from "./entities/building.entity";
import { Floor } from "src/floor/entities/floor.entity";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { isQueryAffected } from "src/helper/validation";
import { Manager } from "src/manager/entities/manager.entity";
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
    abstract addManagersToBuilding(managerIds: string[] | string, id: string): Promise<Building | null>;
    abstract deleteManager(building_id:string, manager_id: string): Promise<Building | null>;

}

@Injectable()
export class TypeORMBuildingService extends BuildingService {
    constructor(
        @InjectRepository(Building)
        private readonly buildingRepository: Repository<Building>,
        @InjectRepository(Floor)
        private readonly floorRepository: Repository<Floor>,
        @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>,
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
        return await this.buildingRepository.find({ 
            relations: ["managers"]
        });
    }

    async findOne(id: string) {
        return await this.buildingRepository.findOne({
            where: { building_id: id },
            relations:["managers", "managers.account"],
            
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
    async addManagersToBuilding(managerIds: string[] | string, id: string): Promise<Building | null> {
        try {
            const building = await this.buildingRepository.findOne({where: {
                building_id: id
            }}) as Building;
            if(Array.isArray(managerIds)){
                managerIds.forEach(async(managerId) => {
                    const manager = await this.managerRepository.findOne({where: {
                        id: managerId
                    }}) as Manager
                    manager.building = building;
                 await this.managerRepository.save(manager)
                })
            }
            else {
                const manager = await this.managerRepository.findOne({where: {
                    id: managerIds
                }}) as Manager
                manager.building = building;
             await this.managerRepository.save(manager)
            }
             const result = await this.buildingRepository.findOne({where: {
             building_id: id,
            }, relations:["managers"] })
            console.log(result)
            return result

        }catch(e) {
            throw new Error(e)
        }  
    }
    async deleteManager(building_id: string, manager_id: string): Promise<Building | null> {
        console.log(building_id, manager_id);
        const building = await this.buildingRepository.findOne({where: {
            building_id
        }})
        await this.buildingRepository.createQueryBuilder().relation(Building, "managers").of(building).remove(manager_id);
        const nebw = await this.buildingRepository.findOne({where: {
            building_id
        },
        relations: ["managers"]
    })
    return nebw;
        
    }
}

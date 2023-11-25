import { IdGenerator } from "../id-generator/id-generator.service";
import { CreateComplainDto } from "./dto/create-complain.dto";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Complain, complainStatus } from "./entities/complain.entity";
import { Floor } from "../floor/entities/floor.entity";
import { UpdateComplainDto } from "./dto/update-complain.dto";
import { isQueryAffected } from "../helper/validation";
import { Manager } from "src/manager/entities/manager.entity";
import { Task } from "src/task/entities/task.entity";
import { Resident } from "src/resident/entities/resident.entity";
@Injectable()
export class ComplainService {
    constructor(
        @InjectRepository(Complain)
        private readonly complainRepository: Repository<Complain>,
        @InjectRepository(Resident)
        private readonly residentRepository: Repository<Resident>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly idGenerate: IdGenerator,
    ) {}

    async create(createComplainDto: CreateComplainDto): Promise<Complain> {
        const { content, resident_id } = createComplainDto;
        const resident = (await this.residentRepository.findOne({
            where: {
                id: resident_id,
            },
        })) as Resident;
        const complain_id = "CL" + this.idGenerate.generateId();
        const data = {
            complain_id,
            resident,
            content,
        };
        const complainData = this.complainRepository.create(data);
        try {
            const complain = await this.complainRepository.save(complainData);
            return complain;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        return await this.complainRepository.find({
            relations: ["resident", "task"],
        });
    }

    async findOne(id: string) {
        return await this.complainRepository.findOne({
            where: { complain_id: id },
            relations: ["resident"],
        });
    }
    async update(
        id: string,
        updateComplainDto: UpdateComplainDto,
    ): Promise<boolean> {
        try {
            let result = await this.complainRepository.update(
                id,
                updateComplainDto,
            );
            return isQueryAffected(result);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.complainRepository.delete({
                complain_id: id,
            });
            return isQueryAffected(result);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getComplainsOfResident(resident_id: string) {
        const result = await this.complainRepository.find({
            where: {
                resident: {
                    id: resident_id,
                },
            },
            relations: {
                task: {
                    invoice: true,
                },
            },
        });
        return result;
    }
}

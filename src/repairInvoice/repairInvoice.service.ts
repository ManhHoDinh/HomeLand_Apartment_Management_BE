import { RepairInvoice } from "src/repairInvoice/entities/repairInvoice.entity";
import { Technician } from "../technician/entities/technician.entity";
import { IdGenerator } from "../id-generator/id-generator.service";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/task/entities/task.entity";
import { ItemRepairInvoice } from "src/itemRepairInvoice/entities/itemRepairInvoice.entity";
import { CreateItemRepairInvoiceDto } from "./dto/create-repairInvoice.dto";
@Injectable()
export class RepairInvoiceService {
    constructor(
        @InjectRepository(RepairInvoice)
        private readonly repairInvoiceRepository: Repository<RepairInvoice>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(ItemRepairInvoice)
        private readonly itemRepairInvoiceRepository: Repository<ItemRepairInvoice>,
        private readonly idGenerate: IdGenerator,
    ) {}
    async create(items: CreateItemRepairInvoiceDto[], task_id:string) {
        const task = (await this.taskRepository.findOne({
            where: { task_id },
        })) as Task;
        const id = "RI" + this.idGenerate.generateId();
        console.log(id)
        const repairInvoice = this.repairInvoiceRepository.create({
            id,
            task,

        })
        await this.repairInvoiceRepository.save(repairInvoice);
        console.log(repairInvoice)
        items.forEach(async (item) => {
            const item_id = "IRI" + this.idGenerate.generateId();
            const itemData = this.itemRepairInvoiceRepository.create({
                id: item_id,
                ...item,
                invoice: repairInvoice,
            });
            await this.itemRepairInvoiceRepository.save(itemData);
        });
        const result = await this.repairInvoiceRepository.findOne({
            where: { id },
        });
        return result;
    }
    async findAll() {
        return await this.repairInvoiceRepository.find({
            relations: ["items", "task"]
           
        });
    }
}

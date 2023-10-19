import { Injectable } from "@nestjs/common";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { BaseRepository } from "../helper/base";
import { Repository } from "typeorm";
import { Apartment } from "./entities/apartment.entity";
import { isAffected } from "../helper/validation";
import { InjectRepository } from "@nestjs/typeorm";

export abstract class ApartmentRepository extends BaseRepository<
    CreateApartmentDto,
    Apartment
> {}
@Injectable()
export class ApartmentService extends ApartmentRepository {
    constructor(
        @InjectRepository(Apartment)
        private readonly propertyRepository: Repository<Apartment>,
    ) {
        super();
    }

    create(createPropertyDto: CreateApartmentDto) {
        let property =
            this.propertyRepository.create(createPropertyDto);

        return Promise.resolve(property);
    }

    async findAll() {
        return await this.propertyRepository.find();
    }

    async findOne(id: string) {
        return await this.propertyRepository.findOne({
            where: { apartment_id: id },
        });
    }

    async update(id: string, updatePropertyDto: UpdateApartmentDto) {
        const result = await this.propertyRepository.update(
            { apartment_id: id },
            updatePropertyDto,
        );
        return isAffected(result);
    }

    async softDelete(id: string): Promise<boolean> {
        const result = await this.propertyRepository.softDelete({
            apartment_id: id,
        });
        return isAffected(result);
    }
}

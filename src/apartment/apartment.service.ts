import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { DataSource, In, Repository } from "typeorm";
import { Apartment } from "./entities/apartment.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../helper/base/base-repository.abstract";
import { UploadService } from "../upload/upload.service";
import { Resident } from "../person/entities/person.entity";
import { IdGenerator } from "../id_generator/id-generator.service";

export abstract class ApartmentRepository extends BaseRepository<
    CreateApartmentDto,
    Apartment
> {
    abstract create(
        createPropertyDto: CreateApartmentDto,
        id?: string,
    ): Promise<Apartment>;
}

@Injectable()
export class ApartmentService extends ApartmentRepository {
    constructor(
        @InjectRepository(Apartment)
        private readonly apartmentRepository: Repository<Apartment>,
        @InjectRepository(Resident)
        private readonly residentRepository: Repository<Resident>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly idGenerate: IdGenerator,
        private readonly uploadService: UploadService,
    ) {
        super();
    }

    async create(
        createApartmentDto: CreateApartmentDto,
        id?: string,
    ): Promise<Apartment> {
        const { images, ...rest } = createApartmentDto;
        let apartment = this.apartmentRepository.create(rest);
        apartment.apartment_id = "APM" + this.idGenerate.generateId();
        if (id) apartment.apartment_id = id;

        const queryRunnder = this.dataSource.createQueryRunner();
        try {
            await queryRunnder.connect();
            await queryRunnder.startTransaction();
            const imageURLS = await Promise.all(
                images.map((image, index) =>
                    this.uploadService.upload(
                        image,
                        `apartment/${apartment.apartment_id}/${
                            index + Date.now() + ".png"
                        }`,
                        "image/png",
                    ),
                ),
            );
            apartment.imageURLs = imageURLS;
            apartment =
                await this.apartmentRepository.save(apartment);

            if (createApartmentDto.residentIds) {
                const residents = await this.residentRepository.find({
                    where: { id: In(createApartmentDto.residentIds) },
                });
                if (
                    residents.length !==
                    createApartmentDto.residentIds.length
                )
                    throw new NotFoundException(
                        "Some resident not found",
                    );
                apartment.residents = residents;
            }

            apartment =
                await this.apartmentRepository.save(apartment);
            await queryRunnder.commitTransaction();
            return apartment;
        } catch (error) {
            await queryRunnder.rollbackTransaction();
            console.error(error);
            throw error;
        } finally {
            await queryRunnder.release();
        }
    }

    async findAll() {
        return await this.apartmentRepository.find();
    }

    async findOne(id: string) {
        return await this.apartmentRepository.findOne({
            where: { apartment_id: id },
        });
    }

    async update(
        id: string,
        updateApartmentDto: UpdateApartmentDto,
    ): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async softDelete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

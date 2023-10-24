import { Injectable } from "@nestjs/common";
import { PersonRepository } from "../person/person.service";
import { Gender, PersonRole } from "../person/entities/person.entity";
import { readFileSync } from "fs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Floor } from "../floor/entities/floor.entity";
import { Building } from "../building/entities/building.entity";
import { ApartmentRepository } from "../apartment/apartment.service";
import { UploadService } from "../upload/upload.service";
import { faker } from "@faker-js/faker";

@Injectable()
export class SeedService {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly personService: PersonRepository,
        private readonly apartmentRepository: ApartmentRepository,
        private readonly uploadService: UploadService,
    ) {}

    async dropDB() {
        try {
            await this.uploadService.removeBucket();
            await this.dataSource.dropDatabase();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createDB() {
        try {
            await this.uploadService.createBucket();
            await this.dataSource.synchronize();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    private readonly NUMBER_OF_BUILDING = 5;
    private readonly NUMBER_OF_FLOOR_PER_BUILDING = 5;
    private readonly NUMBER_OF_APARTMENT_PER_FLOOR = 6;
    private readonly NUMBER_OF_RESIDENT = 600;
    private readonly NUMBER_OF_EMPLOYEE = 20;
    private readonly NUMBER_OF_MANAGER = 20;
    private readonly NUMBER_OF_TECHNICIAN = 20;
    private readonly NUMBER_OF_ADMIN = 5;

    async startSeeding() {
        const frontIdentity = {
            buffer: readFileSync(
                process.cwd() + "/src/seeding/front.jpg",
            ),
        } as Express.Multer.File;

        const backIdentity = {
            buffer: readFileSync(
                process.cwd() + "/src/seeding/back.jpg",
            ),
        } as Express.Multer.File;

        let buildingInfo: any[] = [];
        for (let i = 0; i < this.NUMBER_OF_BUILDING; i++) {
            buildingInfo.push({
                building_id: `BLD${i}`,
                name: `Building ${i}`,
            });
        }
        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Building)
            .values(buildingInfo)
            .execute();

        let floorInfo: any[] = [];
        for (let building of buildingInfo) {
            for (
                let i = 0;
                i < this.NUMBER_OF_FLOOR_PER_BUILDING;
                i++
            ) {
                floorInfo.push({
                    floor_id: `${building.building_id}/FLR${i}`,
                    name: `Floor ${i}`,
                    building_id: building.building_id,
                });
            }
        }
        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Floor)
            .values(floorInfo)
            .execute();

        const images = [
            {
                buffer: readFileSync(
                    process.cwd() + "/src/seeding/room.jpg",
                ),
            } as Express.Multer.File,
            {
                buffer: readFileSync(
                    process.cwd() + "/src/seeding/room (2).jpg",
                ),
            } as Express.Multer.File,
            {
                buffer: readFileSync(
                    process.cwd() + "/src/seeding/room (3).jpg",
                ),
            } as Express.Multer.File,
            {
                buffer: readFileSync(
                    process.cwd() + "/src/seeding/room (4).jpg",
                ),
            } as Express.Multer.File,
            {
                buffer: readFileSync(
                    process.cwd() + "/src/seeding/room (5).jpg",
                ),
            } as Express.Multer.File,
        ];
        let apartmentIds: any[] = [];
        for (let floor of floorInfo) {
            for (
                let i = 0;
                i < this.NUMBER_OF_APARTMENT_PER_FLOOR;
                i++
            ) {
                apartmentIds.push(
                    (
                        await this.apartmentRepository.create({
                            name: "St. Crytal",
                            address: "St. Crytal",
                            images: images,
                            length: 20,
                            building_id: floor.building_id,
                            floor_id: floor.floor_id,
                            width: 15,
                            description: faker.lorem.paragraphs({
                                min: 3,
                                max: 5,
                            }),
                            number_of_bathroom: 2,
                            number_of_bedroom: 1,
                            rent: 9000000,
                        })
                    ).apartment_id,
                );
            }
        }

        for (let i = 0; i < this.NUMBER_OF_RESIDENT; i++) {
            const gender = faker.helpers.arrayElement([
                Gender.FEMALE,
                Gender.MALE,
            ]);
            const role = PersonRole.RESIDENT;
            await this.personService.create({
                stay_at_apartment_id:
                    faker.helpers.arrayElement(apartmentIds),
                front_identify_card_photo: frontIdentity,
                back_identify_card_photo: backIdentity,
                name: faker.person.fullName({ sex: gender }),
                role: role,
                email: faker.internet.email(),
                password: "password",
                activated_at: new Date(),
                date_of_birth: faker.date.between({
                    from: new Date(1930, 1, 1),
                    to: new Date(2000, 1, 1),
                }),
                gender: gender,
                phone_number: faker.phone.number(),
            });
        }
        for (let i = 0; i < this.NUMBER_OF_EMPLOYEE; i++) {
            const gender = faker.helpers.arrayElement([
                Gender.FEMALE,
                Gender.MALE,
            ]);
            const role = PersonRole.EMPLOYEE;

            await this.personService.create({
                front_identify_card_photo: frontIdentity,
                back_identify_card_photo: backIdentity,
                name: faker.person.fullName({ sex: gender }),
                role: role,
                email: faker.internet.email(),
                password: "password",
                activated_at: new Date(),
                date_of_birth: faker.date.between({
                    from: new Date(1930, 1, 1),
                    to: new Date(2000, 1, 1),
                }),
                gender: gender,
                phone_number: faker.phone.number(),
            });
        }

        for (let i = 0; i < this.NUMBER_OF_ADMIN; i++) {
            const gender = faker.helpers.arrayElement([
                Gender.FEMALE,
                Gender.MALE,
            ]);
            const role = PersonRole.ADMIN;

            await this.personService.create({
                front_identify_card_photo: frontIdentity,
                back_identify_card_photo: backIdentity,
                name: faker.person.fullName({ sex: gender }),
                role: role,
                email: faker.internet.email(),
                password: "password",
                activated_at: new Date(),
                date_of_birth: faker.date.between({
                    from: new Date(1930, 1, 1),
                    to: new Date(2000, 1, 1),
                }),
                gender: gender,
                phone_number: faker.phone.number(),
            });
        }

        for (let i = 0; i < this.NUMBER_OF_TECHNICIAN; i++) {
            const gender = faker.helpers.arrayElement([
                Gender.FEMALE,
                Gender.MALE,
            ]);
            const role = PersonRole.TECHINICIAN;

            await this.personService.create({
                front_identify_card_photo: frontIdentity,
                back_identify_card_photo: backIdentity,
                name: faker.person.fullName({ sex: gender }),
                role: role,
                email: faker.internet.email(),
                password: "password",
                activated_at: new Date(),
                date_of_birth: faker.date.between({
                    from: new Date(1930, 1, 1),
                    to: new Date(2000, 1, 1),
                }),
                gender: gender,
                phone_number: faker.phone.number(),
            });
        }

        for (let i = 0; i < this.NUMBER_OF_MANAGER; i++) {
            const gender = faker.helpers.arrayElement([
                Gender.FEMALE,
                Gender.MALE,
            ]);
            const role = PersonRole.MANAGER;

            await this.personService.create({
                front_identify_card_photo: frontIdentity,
                back_identify_card_photo: backIdentity,
                name: faker.person.fullName({ sex: gender }),
                role: role,
                email: faker.internet.email(),
                password: "password",
                activated_at: new Date(),
                date_of_birth: faker.date.between({
                    from: new Date(1930, 1, 1),
                    to: new Date(2000, 1, 1),
                }),
                gender: gender,
                phone_number: faker.phone.number(),
            });
        }
    }
}

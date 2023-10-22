import { Injectable } from "@nestjs/common";
import { PersonRepository } from "../person/person.service";
import { Gender, PersonRole } from "../person/entities/person.entity";
import { readFileSync } from "fs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Floor } from "../floor/entities/floor.entity";
import { Building } from "../building/entities/building.entity";
import { ApartmentRepository } from "../apartment/apartment.service";
import { faker } from "@faker-js/faker";

@Injectable()
export class SeedService {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly personService: PersonRepository,
        private readonly apartmentRepository: ApartmentRepository,
    ) {}

    async dropDatabase() {
        await this.dataSource.dropDatabase();
    }

    async createDatabase() {
        await this.dataSource.synchronize();
    }
    async startSeeding() {
        const frontIdentity = {
            buffer: readFileSync(
                process.cwd() + "/src/seeding/front.jpg",
            ),
        };

        const backIdentity = {
            buffer: readFileSync(
                process.cwd() + "/src/seeding/back.jpg",
            ),
        };

        const demoAdmin = await this.personService.create(
            {
                name: "DEMO ADMIN",
                gender: Gender.FEMALE,
                phone_number: "0811111111",
                date_of_birth: new Date("1872-05-27"),
                role: PersonRole.ADMIN,
                back_identify_card_photo:
                    backIdentity as Express.Multer.File,
                front_identify_card_photo:
                    frontIdentity as Express.Multer.File,
                email: "admin@gmail.com",
                password: "password",
            },
            undefined,
            "ADM000000",
        );

        const demoResident = await this.personService.create(
            {
                name: "DEMO RESIDENT",
                gender: Gender.MALE,
                phone_number: "0555555555",
                date_of_birth: new Date("1900-01-31"),
                role: PersonRole.RESIDENT,
                back_identify_card_photo:
                    backIdentity as Express.Multer.File,
                front_identify_card_photo:
                    frontIdentity as Express.Multer.File,
                email: "resident@gmail.com",
                password: "password",
            },
            undefined,
            "RSD000000",
        );
        const demoResident2 = await this.personService.create(
            {
                name: "DEMO RESIDENT 2",
                gender: Gender.FEMALE,
                phone_number: "0444444444",
                date_of_birth: new Date("1952-03-15"),
                role: PersonRole.RESIDENT,
                back_identify_card_photo:
                    backIdentity as Express.Multer.File,
                front_identify_card_photo:
                    frontIdentity as Express.Multer.File,
                email: "resident2@gmail.com",
                password: "password",
            },
            undefined,
            "RSD000001",
        );

        const demoManager = await this.personService.create(
            {
                name: "DEMO MANAGER",
                gender: Gender.FEMALE,
                phone_number: "0808080808",
                date_of_birth: new Date("1960-07-26"),
                role: PersonRole.MANAGER,
                back_identify_card_photo:
                    backIdentity as Express.Multer.File,
                front_identify_card_photo:
                    frontIdentity as Express.Multer.File,
                email: "manager@gmail.com",
                password: "password",
            },
            undefined,
            "MNG000000",
        );

        const demoTechnician = await this.personService.create(
            {
                name: "DEMO TECHNICIAN",
                gender: Gender.MALE,
                phone_number: "0303030303",
                date_of_birth: new Date("1989-12-20"),
                role: PersonRole.TECHINICIAN,
                back_identify_card_photo:
                    backIdentity as Express.Multer.File,
                front_identify_card_photo:
                    frontIdentity as Express.Multer.File,
                email: "technician@gmail.com",
                password: "password",
            },
            undefined,
            "TEC000000",
        );

        const demoEmployee = await this.personService.create(
            {
                name: "DEMO EMPLOYEE",
                gender: Gender.FEMALE,
                phone_number: "0956565656",
                date_of_birth: new Date("1970-8-22"),
                role: PersonRole.EMPLOYEE,
                back_identify_card_photo:
                    backIdentity as Express.Multer.File,
                front_identify_card_photo:
                    frontIdentity as Express.Multer.File,
                email: "employee@gmail.com",
                password: "password",
            },
            undefined,
            "EMP000000",
        );

        const building = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Building)
            .values([
                {
                    building_id: "BLD0",
                    name: "Building 0",
                },
            ])
            .execute();

        const floor = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Floor)
            .values([
                {
                    floor_id: "FLR0",
                    name: "Floor 0",
                    building_id: "BLD0",
                },
            ])
            .execute();

        const apartment = await this.apartmentRepository.create({
            images: [
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
            ],
            length: 20,
            building_id: "BLD0",
            floor_id: "FLR0",
            width: 15,
            description: "A small apartment",
            number_of_bathroom: 1,
            number_of_bedroom: 1,
            rent: 5000000,
        });

        return [
            demoAdmin,
            demoResident,
            demoManager,
            demoTechnician,
            demoEmployee,
            apartment,
        ];
    }

    async createMultipleApartments(n: number) {
        for (let i = 0; i < n; i++) {
            const apartment = await this.apartmentRepository.create({
                images: [
                    {
                        buffer: readFileSync(
                            process.cwd() + "/src/seeding/room.jpg",
                        ),
                    } as Express.Multer.File,
                    {
                        buffer: readFileSync(
                            process.cwd() +
                                "/src/seeding/room (2).jpg",
                        ),
                    } as Express.Multer.File,
                    {
                        buffer: readFileSync(
                            process.cwd() +
                                "/src/seeding/room (3).jpg",
                        ),
                    } as Express.Multer.File,
                    {
                        buffer: readFileSync(
                            process.cwd() +
                                "/src/seeding/room (4).jpg",
                        ),
                    } as Express.Multer.File,
                    {
                        buffer: readFileSync(
                            process.cwd() +
                                "/src/seeding/room (5).jpg",
                        ),
                    } as Express.Multer.File,
                ],
                length: 20,
                building_id: "BLD0",
                floor_id: "FLR0",
                width: 15,
                description: "A small apartment",
                number_of_bathroom: 1,
                number_of_bedroom: 1,
                rent: 5000000,
            });
        }
    }

    async seeding() {
        for (let i = 1; i < 200; i++) {
            let gender = faker.helpers.arrayElement([
                Gender.FEMALE,
                Gender.MALE,
            ]);
            await this.personService.create({
                activated_at: new Date(),
                back_identify_card_photo: {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/front.jpg",
                    ),
                } as Express.Multer.File,
                front_identify_card_photo: {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/back.jpg",
                    ),
                } as Express.Multer.File,
                name: faker.person.fullName({ sex: gender }),
                role: faker.helpers.arrayElement([
                    PersonRole.ADMIN,
                    PersonRole.EMPLOYEE,
                    PersonRole.MANAGER,
                    PersonRole.RESIDENT,
                    PersonRole.TECHINICIAN,
                ]),
                email: faker.internet.email(),
                password: "password",
                date_of_birth: faker.date.past({
                    years: 60,
                    refDate: new Date("2000-01-01"),
                }),
                gender: gender,
                phone_number: faker.phone.number().toString(),
            });
        }

        let buildings: any = [];
        for (let i = 0; i < 5; i++) {
            buildings.push({
                building_id: "BLD" + i,
                name: "Building " + i,
            });
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Building)
            .values(buildings)
            .execute();

        let floors: any = [];
        for (let building of buildings) {
            for (let i = 0; i < 10; i++) {
                floors.push({
                    floor_id: building.building_id + "/FLR" + i,
                    name: "Floor " + i,
                    building_id: building.building_id,
                });
            }
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Floor)
            .values(floors)
            .execute();

        let apartments: any = [];
        {
            const images = [
                {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/room.jpg",
                    ),
                } as Express.Multer.File,
                {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/room (2).jpg",
                    ),
                } as Express.Multer.File,
                {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/room (3).jpg",
                    ),
                } as Express.Multer.File,
                {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/room (4).jpg",
                    ),
                } as Express.Multer.File,
                {
                    buffer: readFileSync(
                        process.cwd() + "/src/seed/room (5).jpg",
                    ),
                } as Express.Multer.File,
            ];
            for (let floor of floors) {
                for (let i = 0; i < 8; i++) {
                    await this.apartmentRepository.create({
                        images: images,
                        length: 20,
                        building_id: floor.building_id,
                        floor_id: floor.floor_id,
                        width: 15,
                        description: faker.lorem.paragraph({
                            min: 3,
                            max: 6,
                        }),
                        number_of_bathroom: 1,
                        number_of_bedroom: 1,
                        rent: 9000000,
                    });
                }
            }
        }
    }
}

import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Floor } from "../floor/entities/floor.entity";
import { Building } from "../building/entities/building.entity";
import { StorageManager } from "../storage/storage.service";
import { faker } from "@faker-js/faker";
import { Gender } from "../helper/class/profile.entity";
import { MemoryStoredFile } from "nestjs-form-data";
import { Admin } from "../admin/entities/admin.entity";
import { IdGenerator } from "../id-generator/id-generator.service";
import { HashService } from "../hash/hash.service";
import { AvatarGenerator } from "../avatar-generator/avatar-generator.service";
import { ApartmentService } from "../apartment/apartment.service";
import { Resident } from "../resident/entities/resident.entity";
import { Manager } from "../manager/entities/manager.entity";
import { Technician } from "../technician/entities/technician.entity";
import { ResidentRepository } from "../resident/resident.service";
import { Contract } from "src/contract/entities/contract.entity";

import { ContractRole, ContractStatusRole } from "../helper/enums/contractEnum";
import { Service } from "../service/entities/service.entity";
import { ServicePackage } from "../service-package/entities/service-package.entity";
import { Client } from "elasticsearch";
import { BuildingService } from "../building/building.service";
import { FloorService } from "../floor/floor.service";
import { Apartment } from "../apartment/entities/apartment.entity";
import {
    Equipment,
    EquipmentStatus,
} from "../equipment/entities/equipment.entity";
import { eq } from "lodash";
import { EquipmentService } from "../equipment/equipment.service";
@Injectable()
export class SeedService {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly storageManager: StorageManager,
        private readonly idGenerator: IdGenerator,
        private readonly hashService: HashService,
        private readonly avatarGenerator: AvatarGenerator,
        private readonly elasticsearchClient: Client,
        private readonly residentService: ResidentRepository,
        private readonly buildingService: BuildingService,
        private readonly apartmentService: ApartmentService,
        private readonly floorService: FloorService,
        private readonly equipmentService: EquipmentService,
    ) {}

    async dropDB() {
        try {
            await this.storageManager.destroyStorage();
            await this.dataSource.dropDatabase();
            await this.elasticsearchClient.indices.delete({
                index: "apartment",
            });
            await this.elasticsearchClient.indices.create({
                index: "apartment",
                method: "PUT",
            });
        } catch (error) {
            console.error(error);
            // throw error;
        }
    }
    async createDB() {
        try {
            await this.storageManager.initiateStorage();
            await this.dataSource.synchronize();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    private readonly NUMBER_OF_BUILDING = 5;
    private readonly NUMBER_OF_FLOOR_PER_BUILDING = 5;
    private readonly NUMBER_OF_APARTMENT_PER_FLOOR = 6;
    private readonly NUMBER_OF_RESIDENT = 50;
    private readonly NUMBER_OF_EMPLOYEE = 10;
    private readonly NUMBER_OF_MANAGER = 10;
    private readonly NUMBER_OF_TECHNICIAN = 10;
    private readonly NUMBER_OF_ADMIN = 2;
    private readonly NUMBER_OF_Service = 5;
    private readonly NUMBER_OF_ServicePackage_PER_SERVICE = 5;

    private readonly frontIdentity = {
        buffer: readFileSync(process.cwd() + "/src/seed/front.jpg"),
    } as MemoryStoredFile;

    private readonly backIdentity = {
        buffer: readFileSync(process.cwd() + "/src/seed/back.jpg"),
    } as MemoryStoredFile;

    private readonly images = [
        {
            buffer: readFileSync(process.cwd() + "/src/seed/room.jpg"),
        } as MemoryStoredFile,
        {
            buffer: readFileSync(process.cwd() + "/src/seed/room (2).jpg"),
        } as MemoryStoredFile,
        {
            buffer: readFileSync(process.cwd() + "/src/seed/room (3).jpg"),
        } as MemoryStoredFile,
        {
            buffer: readFileSync(process.cwd() + "/src/seed/room (4).jpg"),
        } as MemoryStoredFile,
        {
            buffer: readFileSync(process.cwd() + "/src/seed/room (5).jpg"),
        } as MemoryStoredFile,
    ];

    async startSeeding() {
        await this.createDemoAdmin();
        await this.createDemoResident();
        await this.createDemoManager();
        await this.createDemoTechnician();
        await this.createDemoAccountResident();
        await this.createDemoResidents();

        // Create demo building
        let buildings: Building[] = await this.createDemoBuildings();
        let floors: Floor[] = await this.createDemoFloors(buildings);
        let apartments: Apartment[] = await this.createDemoApartments(floors);
        let equipments: Equipment[] = await this.createDemoEquipments(
            buildings,
            floors,
            apartments,
        );
        await this.createDemoContract();
        await this.createDemoServices();
        await this.createDemoServicePackages();
    }

    async createDemoEquipments(
        buildings: Building[],
        floors: Floor[],
        apartments: Apartment[],
    ): Promise<Equipment[]> {
        let thangmayImage = {
            buffer: readFileSync(process.cwd() + "/src/seed/thangmay.jpg"),
        } as MemoryStoredFile;
        let equipments: Equipment[] = [];
        for (let building of buildings) {
            for (let i = 0; i < 3; i++)
                equipments.push(
                    await this.equipmentService.create({
                        name: "Thang may",
                        images: [thangmayImage],
                        description: "Thang may",
                        building_id: building.building_id,
                        status: EquipmentStatus.AVAILABLE,
                    }),
                );
        }
        let cambienkhoiImage = {
            buffer: readFileSync(process.cwd() + "/src/seed/cambienkhoi.jpg"),
        } as MemoryStoredFile;

        for (let floor of floors) {
            for (let i = 0; i < 5; i++)
                equipments.push(
                    await this.equipmentService.create({
                        name: "Cam bien khoi",
                        images: [cambienkhoiImage],
                        description: "Cam bien khoi",
                        floor_id: floor.floor_id,
                        status: EquipmentStatus.AVAILABLE,
                    }),
                );
        }
        let tulanhImage = {
            buffer: readFileSync(process.cwd() + "/src/seed/tulanh.jpg"),
        } as MemoryStoredFile;

        for (let apartment of apartments) {
            equipments.push(
                await this.equipmentService.create({
                    name: "Tu lanh",
                    images: [tulanhImage],
                    description: "Tu lanh",
                    apartment_id: apartment.apartment_id,
                    status: EquipmentStatus.AVAILABLE,
                }),
            );
        }

        let maylanhImage = {
            buffer: readFileSync(process.cwd() + "/src/seed/maylanh.jpg"),
        } as MemoryStoredFile;

        for (let apartment of apartments) {
            equipments.push(
                await this.equipmentService.create({
                    name: "May lanh",
                    images: [maylanhImage],
                    description: "May lanh",
                    apartment_id: apartment.apartment_id,
                    status: EquipmentStatus.AVAILABLE,
                }),
            );
        }

        return equipments;
    }
    async createDemoBuildings(): Promise<Building[]> {
        let buildings: Building[] = [];
        for (let i = 0; i < this.NUMBER_OF_BUILDING; i++) {
            buildings.push(
                await this.buildingService.create({
                    name: `Building ${i}`,
                    address: faker.location.streetAddress(),
                    max_floor: this.NUMBER_OF_FLOOR_PER_BUILDING,
                }),
            );
        }

        return buildings;
    }

    async createDemoFloors(buildings: Building[]): Promise<Floor[]> {
        let floors: Floor[] = [];
        for (let building of buildings) {
            for (let i = 0; i < this.NUMBER_OF_FLOOR_PER_BUILDING; i++) {
                floors.push(
                    await this.floorService.create({
                        name: `Floor ${i}`,
                        building_id: building.building_id,
                        max_apartment: this.NUMBER_OF_APARTMENT_PER_FLOOR,
                    }),
                );
            }
        }

        return floors;
    }
    async createDemoApartments(floors: Floor[]): Promise<Apartment[]> {
        let apartments: Apartment[] = [];
        for (let floor of floors) {
            for (let i = 0; i < this.NUMBER_OF_APARTMENT_PER_FLOOR; i++) {
                apartments.push(
                    await this.apartmentService.create({
                        name: "St. Crytal",
                        images: this.images,
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
                    }),
                );
            }
        }

        return apartments;
    }
    async createDemoAccountResident() {
        let id = "RESIDENT";
        const resident = await this.dataSource.getRepository(Resident).save({
            id: id,
            profile: {
                date_of_birth: faker.date.birthdate(),
                name: faker.person.fullName(),
                gender: Gender.MALE,
                phone_number: faker.phone.number(),
                front_identify_card_photo_URL: await this.storageManager.upload(
                    this.frontIdentity.buffer,
                    "resident/" + id + "/frontIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
                back_identify_card_photo_URL: await this.storageManager.upload(
                    this.backIdentity.buffer,
                    "resident/" + id + "/backIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
            },
            account: {
                owner_id: id,
                email: "resident@gmail.com",
                password: this.hashService.hash("password"),
                avatarURL: await this.storageManager.upload(
                    await this.avatarGenerator.generateAvatar("DEMO RESIDENT"),
                    "resident/" + id + "/avatar.svg",
                    "image/svg+xml",
                ),
            },
        });
    }

    async createDemoTechnician() {
        let id = "TEC" + this.idGenerator.generateId();
        const technician = await this.dataSource
            .getRepository(Technician)
            .save({
                id: id,
                profile: {
                    date_of_birth: new Date("1999-01-01"),
                    name: "DEMO TECHNICIAN",
                    gender: Gender.MALE,
                    phone_number: "0896666666",
                    front_identify_card_photo_URL:
                        await this.storageManager.upload(
                            this.frontIdentity.buffer,
                            "admin/" + id + "/frontIdentifyPhoto.jpg",
                            "image/jpeg",
                        ),
                    back_identify_card_photo_URL:
                        await this.storageManager.upload(
                            this.backIdentity.buffer,
                            "admin/" + id + "/backIdentifyPhoto.jpg",
                            "image/jpeg",
                        ),
                },
                account: {
                    owner_id: id,
                    email: "technician@gmail.com",
                    password: this.hashService.hash("password"),
                    avatarURL: await this.storageManager.upload(
                        await this.avatarGenerator.generateAvatar(
                            "DEMO TECHNICIAN",
                        ),
                        "admin/" + id + "/avatar.svg",
                        "image/svg+xml",
                    ),
                },
            });
    }

    async createDemoManager() {
        let id = "MNG" + this.idGenerator.generateId();
        const manager = await this.dataSource.getRepository(Manager).save({
            id: id,
            profile: {
                date_of_birth: new Date("1999-01-01"),
                name: "DEMO MANAGER",
                gender: Gender.MALE,
                phone_number: "0677778787",
                front_identify_card_photo_URL: await this.storageManager.upload(
                    this.frontIdentity.buffer,
                    "admin/" + id + "/frontIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
                back_identify_card_photo_URL: await this.storageManager.upload(
                    this.backIdentity.buffer,
                    "admin/" + id + "/backIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
            },
            account: {
                owner_id: id,
                email: "manager@gmail.com",
                password: this.hashService.hash("password"),
                avatarURL: await this.storageManager.upload(
                    await this.avatarGenerator.generateAvatar("DEMO MANAGER"),
                    "admin/" + id + "/avatar.svg",
                    "image/svg+xml",
                ),
            },
        });
    }

    async createDemoResident(residentId?: string, email?: string) {
        let id = "RES" + this.idGenerator.generateId();
        const random = Math.random() * 2;
        if (residentId) id = residentId;

        const resident = await this.dataSource.getRepository(Resident).save({
            id: id,
            profile: {
                date_of_birth: faker.date.birthdate(),
                name: faker.person.fullName(),
                gender: Gender.MALE,
                phone_number: faker.phone.number(),
                front_identify_card_photo_URL: await this.storageManager.upload(
                    this.frontIdentity.buffer,
                    "resident/" + id + "/frontIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
                back_identify_card_photo_URL: await this.storageManager.upload(
                    this.backIdentity.buffer,
                    "resident/" + id + "/backIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
            },
            account:
                random === 0
                    ? {
                          owner_id: id,
                          email: faker.internet.email(),
                          password: this.hashService.hash("password"),
                          avatarURL: await this.storageManager.upload(
                              await this.avatarGenerator.generateAvatar(
                                  "DEMO RESIDENT",
                              ),
                              "resident/" + id + "/avatar.svg",
                              "image/svg+xml",
                          ),
                      }
                    : undefined,
        });
    }

    async createDemoEmployee() {
        let id = "EMP" + this.idGenerator.generateId();
        const employee = await this.dataSource.getRepository(Resident).save({
            id: id,
            profile: {
                date_of_birth: faker.date.birthdate(),
                name: faker.person.fullName(),
                gender: Gender.MALE,
                phone_number: faker.phone.number(),
                front_identify_card_photo_URL: await this.storageManager.upload(
                    this.frontIdentity.buffer,
                    "resident/" + id + "/frontIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
                back_identify_card_photo_URL: await this.storageManager.upload(
                    this.backIdentity.buffer,
                    "resident/" + id + "/backIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
                avatarURL: await this.storageManager.upload(
                    await this.avatarGenerator.generateAvatar("DEMO EMPOLYEE"),
                    "admin/" + id + "/avatar.svg",
                    "image/svg+xml",
                ),
            },
        });
    }

    async createDemoAdmin() {
        let id = "ADM" + this.idGenerator.generateId();
        const admin = await this.dataSource.getRepository(Admin).save({
            id: id,
            profile: {
                date_of_birth: new Date("1999-01-01"),
                name: "DEMO ADMIN",
                gender: Gender.MALE,
                phone_number: "0755555555",
                front_identify_card_photo_URL: await this.storageManager.upload(
                    this.frontIdentity.buffer,
                    "admin/" + id + "/frontIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
                back_identify_card_photo_URL: await this.storageManager.upload(
                    this.backIdentity.buffer,
                    "admin/" + id + "/backIdentifyPhoto.jpg",
                    "image/jpeg",
                ),
            },
            account: {
                owner_id: id,
                email: "admin@gmail.com",
                password: this.hashService.hash("password"),
                avatarURL: await this.storageManager.upload(
                    await this.avatarGenerator.generateAvatar("DEMO ADMIN"),
                    "admin/" + id + "/avatar.svg",
                    "image/svg+xml",
                ),
            },
        });
    }
    async createDemoApartment(id?: string) {
        let apartmentId = "APM" + this.idGenerator.generateId();
        if (id) apartmentId = id;
        await this.apartmentService.create(
            {
                name: "St. Crytal",
                images: this.images,
                length: 20,
                building_id: "BLD0",
                floor_id: "BLD0/FLR0",
                width: 15,
                description: faker.lorem.paragraphs({
                    min: 3,
                    max: 5,
                }),
                number_of_bathroom: 2,
                number_of_bedroom: 1,
                rent: 9000000,
            },
            apartmentId,
        );
    }
    async createDemoContract() {
        await this.createDemoResident("RES123");
        await this.createDemoApartment("APM1698502960091");
        let contractId = "Contract" + this.idGenerator.generateId();
        await this.dataSource.getRepository(Contract).save({
            contract_id: contractId,
            resident_id: "RES123",
            apartment_id: "APM1698502960091",
            expire_at: new Date("2030-01-01"),
            role: ContractRole.RENT,
            status: ContractStatusRole.INACTIVE,
        });
    }
    async createDemoServices() {
        let ServiceInfo: any[] = [];
        for (let i = 0; i < this.NUMBER_OF_Service; i++) {
            ServiceInfo.push({
                service_id: `Service${i}`,
                name: `Service ${i}`,
                images: this.images,
                description: `This is a demo service ${i}`,
            });
        }
        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Service)
            .values(ServiceInfo)
            .execute();
    }
    async createDemoServicePackages() {
        let ServicePackageInfo: any[] = [];

        for (let i = 0; i < this.NUMBER_OF_Service; i++)
            for (let j = 0; j < this.NUMBER_OF_ServicePackage_PER_SERVICE; j++)
                ServicePackageInfo.push({
                    servicePackage_id: `ServicePackage${i}-${j}`,
                    service_id: `Service${i}`,
                    name: `Service package ${j} in Service ${i}`,
                    expired_date: 30,
                    per_unit_price: 10,
                });

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(ServicePackage)
            .values(ServicePackageInfo)
            .execute();
    }

    async createDemoResidents() {
        for (let i = 0; i < this.NUMBER_OF_RESIDENT; i++) {
            await this.createDemoResident();
        }
    }
}

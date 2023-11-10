
describe('ApartmentService', () => {
  let service: ApartmentServiceImp;
  let dataSource: DataSource;
  let idGenerator: IdGenerator;
  let storageManager: StorageManager;
  let apartmentRepository: any;
  let residentRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentServiceImp,
        {
          provide: getRepositoryToken(Apartment),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Resident),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: IdGenerator,
          useValue: {
            generate: jest.fn(),
          },
        },
        {
          provide: StorageManager,
          useValue: {
            upload: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApartmentServiceImp>(ApartmentServiceImp);
    dataSource = module.get<DataSource>(DataSource);
    idGenerator = module.get<IdGenerator>(IdGenerator);
    storageManager = module.get<StorageManager>(StorageManager);
    apartmentRepository = module.get(getRepositoryToken(Apartment));
    residentRepository = module.get(getRepositoryToken(Resident));
  });

  describe('create', () => {
    it('should create an apartment', async () => {
      const createApartmentDto: CreateApartmentDto = {
        name: 'Test Apartment',
        address: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };
      const apartment = new Apartment();
      apartment.id = 'test-id';
      apartment.name = createApartmentDto.name;
      apartment.address = createApartmentDto.address;
      apartment.city = createApartmentDto.city;
      apartment.state = createApartmentDto.state;
      apartment.zip = createApartmentDto.zip;
      jest.spyOn(idGenerator, 'generate').mockReturnValue(apartment.id);
      jest.spyOn(apartmentRepository, 'save').mockResolvedValue(apartment);

      const result = await service.create(createApartmentDto);

      expect(result).toEqual(apartment);
      expect(idGenerator.generate).toHaveBeenCalled();
      expect(apartmentRepository.save).toHaveBeenCalledWith(apartment);
    });
  });

  describe('findAll', () => {
    it('should return an array of apartments', async () => {
      const apartments = [
        {
          id: 'test-id-1',
          name: 'Test Apartment 1',
          address: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zip: '12345',
        },
        {
          id: 'test-id-2',
          name: 'Test Apartment 2',
          address: '456 Test St',
          city: 'Test City',
          state: 'TS',
          zip: '12345',
        },
      ];
      jest.spyOn(apartmentRepository, 'find').mockResolvedValue(apartments);

      const result = await service.findAll();

      expect(result).toEqual(apartments);
      expect(apartmentRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an apartment', async () => {
      const apartment = {
        id: 'test-id',
        name: 'Test Apartment',
        address: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };
      jest.spyOn(apartmentRepository, 'findOne').mockResolvedValue(apartment);

      const result = await service.findOne(apartment.id);

      expect(result).toEqual(apartment);
      expect(apartmentRepository.findOne).toHaveBeenCalledWith(apartment.id);
    });

    it('should throw a NotFoundException if the apartment is not found', async () => {
      jest.spyOn(apartmentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('test-id')).rejects.toThrowError(
        NotFoundException,
      );
      expect(apartmentRepository.findOne).toHaveBeenCalledWith('test-id');
    });
  });

  describe('update', () => {
    it('should update an apartment', async () => {
      const updateApartmentDto: UpdateApartmentDto = {
        name: 'Updated Apartment Name',
      };
      const apartment = {
        id: 'test-id',
        name: 'Test Apartment',
        address: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };
      jest.spyOn(apartmentRepository, 'findOne').mockResolvedValue(apartment);
      jest.spyOn(apartmentRepository, 'save').mockResolvedValue(apartment);

      const result = await service.update(apartment.id, updateApartmentDto);

      expect(result).toBe(true);
      expect(apartmentRepository.findOne).toHaveBeenCalledWith(apartment.id);
      expect(apartmentRepository.save).toHaveBeenCalledWith({
        ...apartment,
        ...updateApartmentDto,
      });
    });

    it('should throw a NotFoundException if the apartment is not found', async () => {
      const updateApartmentDto: UpdateApartmentDto = {
        name: 'Updated Apartment Name',
      };
      jest.spyOn(apartmentRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update('test-id', updateApartmentDto),
      ).rejects.toThrowError(NotFoundException);
      expect(apartmentRepository.findOne).toHaveBeenCalledWith('test-id');
    });
  });

  describe('delete', () => {
    it('should delete an apartment', async () => {
      const apartment = {
        id: 'test-id',
        name: 'Test Apartment',
        address: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };
      jest.spyOn(apartmentRepository, 'findOne').mockResolvedValue(apartment);
      jest.spyOn(apartmentRepository, 'delete').mockResolvedValue(undefined);

      await service.delete(apartment.id);

      expect(apartmentRepository.findOne).toHaveBeenCalledWith(apartment.id);
      expect(apartmentRepository.delete).toHaveBeenCalledWith(apartment.id);
    });

    it('should throw a NotFoundException if the apartment is not found', async () => {
      jest.spyOn(apartmentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.delete('test-id')).rejects.toThrowError(
        NotFoundException,
      );
      expect(apartmentRepository.findOne).toHaveBeenCalledWith('test-id');
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'apollo-datasource';
import { Apartment } from './entities/apartment.entity';
import { ApartmentServiceImp } from './apartment.service';
import { Resident } from '../resident/entities/resident.entity';
import { IdGenerator } from '../id-generator/id-generator.service';
import { StorageManager } from '../storage/storage.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

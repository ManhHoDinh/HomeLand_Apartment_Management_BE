import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { hashSync } from 'bcrypt';
import { IdGeneratorService } from '../id_generator/id_generator.service';
import { UploadService } from '../upload/upload.service';
import { BaseRepository } from '../helper/base/BaseRepository';

export abstract class PersonRepository extends BaseRepository<
  CreatePersonDto,
  UpdatePersonDto,
  Person
> {
  abstract findOneByPhoneNumber(phone_number: string): Promise<Person | null>;
}

@Injectable()
export class PersonService implements PersonRepository {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly idGenerator: IdGeneratorService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createDto: CreatePersonDto): Promise<Person> {
    let person = this.personRepository.create(createDto);
    if (person.password) {
      person.password = hashSync(person.password, 12);
    }
    person.id = 'R' + this.idGenerator.generateId();

    try {
      const [dataFront, dataBack] = await Promise.all([
        this.uploadService.upload(
          createDto.front_identify_card_photo_URL as any,
          '/person/' + person.id + '/front_identify_card_photo_URL.png',
          'image/png',
        ),

        this.uploadService.upload(
          createDto.back_identify_card_photo_URL as any,
          '/person/' + person.id + '/back_identify_card_photo_URL.png',
          'image/png',
        ),
      ]);
      if (dataFront && dataBack) {
        person.front_identify_card_photo_URL =
          this.uploadService.BLOB_STORAGE_URL + '/' + dataFront.path;
        person.back_identify_card_photo_URL =
          this.uploadService.BLOB_STORAGE_URL + '/' + dataBack.path;
      }
    } catch (error) {
      throw error;
    }

    return await this.personRepository.save(person);
  }

  findOne(id: string): Promise<Person | null> {
    return this.personRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneByPhoneNumber(phone_number: string): Promise<Person | null> {
    return this.personRepository.findOne({
      where: {
        phone_number,
      },
    });
  }

  findAll() {
    return `This action returns all person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}

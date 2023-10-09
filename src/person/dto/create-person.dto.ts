import { OmitType } from '@nestjs/mapped-types';
import { Person } from '../entities/person.entity';

export class CreatePersonDto extends OmitType(Person, [
  'id',
  'stay_at',
] as const) {}

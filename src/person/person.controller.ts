import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { PersonRepository } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonRepository) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @FormDataRequest()
  create(@Body() CreatePersonDto: CreatePersonDto) {
    return this.personService.create(CreatePersonDto);
  }

  // @Get()
  // findAll() {
  //   return this.personService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.personService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
  //   return this.personService.update(+id, updatePersonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.personService.remove(+id);
  // }
}

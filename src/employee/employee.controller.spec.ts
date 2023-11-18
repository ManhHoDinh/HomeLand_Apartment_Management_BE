import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Module, NotFoundException } from '@nestjs/common';
import { Gender, PersonRole, Profile } from "../helper/class/profile.entity";
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from "./employee.module"; 


describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let mockEmployeeRepository: any;

  beforeEach(() => {
    mockEmployeeRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      updateEmployee: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    employeeController = new EmployeeController(mockEmployeeRepository);
  });

  describe('create', () => {
    it('should create an employee', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        front_identify_card_photo: new MemoryStoredFile,
        back_identify_card_photo: new MemoryStoredFile,
        name: '',
        date_of_birth: new Date,
        gender: Gender.MALE,
        phone_number: ''
      };
      const expectedEmployee: Employee = {
        id: '',
        profile: new Profile,
        created_at: new Date,
        role: PersonRole.EMPLOYEE,
      };

      mockEmployeeRepository.create.mockReturnValue(expectedEmployee);

      const result = await employeeController.create(createEmployeeDto);

      expect(mockEmployeeRepository.create).toHaveBeenCalledWith(createEmployeeDto);
      expect(result).toBe(expectedEmployee);
    });
  });

  describe('findOne', () => {
    it('should find one employee', async () => {
      const id = '1';
      const expectedEmployee: Employee = {
        id: '',
        profile: new Profile,
        created_at: new Date,
        role: PersonRole.EMPLOYEE,
      };

      mockEmployeeRepository.findOne.mockReturnValue(expectedEmployee);

      const result = await employeeController.findOne(id);

      expect(mockEmployeeRepository.findOne).toHaveBeenCalledWith(id);
      expect(result).toBe(expectedEmployee);
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const id = '1';
      const updateEmployeeDto: UpdateEmployeeDto = {
        front_identify_card_photo: new MemoryStoredFile,
        back_identify_card_photo: new MemoryStoredFile
      };
      const expectedEmployee: Employee = {
        id: '',
        profile: new Profile,
        created_at: new Date,
        role: PersonRole.EMPLOYEE,
      };

      mockEmployeeRepository.updateEmployee.mockReturnValue(expectedEmployee);

      const result = await employeeController.update(id, updateEmployeeDto);

      expect(mockEmployeeRepository.updateEmployee).toHaveBeenCalledWith(id, updateEmployeeDto);
      expect(result).toBe(expectedEmployee);
    });
  });

  describe('findAll', () => {
    it('should find all employees', async () => {
      const expectedEmployees: Employee[] = [
        {
          id: '',
          profile: new Profile,
          created_at: new Date,
          role: PersonRole.EMPLOYEE,
        },
        {
          id: '',
          profile: new Profile,
          created_at: new Date,
          role: PersonRole.EMPLOYEE,
        },
      ];

      mockEmployeeRepository.findAll.mockReturnValue(expectedEmployees);

      const result = await employeeController.findAll();

      expect(mockEmployeeRepository.findAll).toHaveBeenCalled();
      expect(result).toBe(expectedEmployees);
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      const id = '1';

      await employeeController.remove(id);

      expect(mockEmployeeRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
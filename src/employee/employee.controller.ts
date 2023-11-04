import {
        Controller,
        Post,
        Body,
        UseGuards,
        Get,
        Param,
        Patch,
        Query,
        ParseEnumPipe,
        Delete,
        NotFoundException,
        BadRequestException,
} from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import {
        ApiBearerAuth,
        ApiConsumes,
        ApiCreatedResponse,
        ApiOperation,
        ApiQuery,
        ApiTags,
        ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { Employee } from "./entities/employee.entity";
import { Auth } from "../helper/decorator/auth.decorator";
import { FormDataRequest } from "nestjs-form-data";
import { PersonRole } from "../helper/class/profile.entity";
import { JWTAuthGuard } from "../auth/guard/jwt-auth.guard";
import { EmployeeRepository, EmployeeService } from "./employee.service";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { IsOptional } from "class-validator";
@ApiTags("Employee")
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("employee")
export class EmployeeController {
        constructor(private readonly employeeRepository: EmployeeRepository) { }
        @ApiOperation({ summary: "Create person profile" })
        @ApiConsumes("multipart/form-data")
        @ApiUnprocessableEntityResponse({
                description: "Email or phone number already exists",
        })
        @ApiCreatedResponse({
                description: "Create person profile successfully",
        })
        @Post()
        @FormDataRequest()
        async create(@Body() createPersonDto: CreateEmployeeDto) {
                return await this.employeeRepository.create(createPersonDto);
        }
        @Get(":id")
        findOne(@Param("id") id: string) {
                return this.employeeRepository.findOne(id);
        }
        @ApiOperation({ summary: "update employee" })
        @Patch(":id")
        @ApiConsumes("multipart/form-data")
        @FormDataRequest()
        async update(
                @Param("id") id: string,
                @Body() updateEmployeeDto: UpdateEmployeeDto,
        ) {
                if (!updateEmployeeDto) {
                        throw new BadRequestException("No data provided for update.");
                }

                const result = await this.employeeRepository.update(id, updateEmployeeDto);
                if (result) {
                        return [{ msg: "Employee updated" }, await this.findOne(id)];
                }

                throw new NotFoundException("Employee not found");
        }
        @Get()
        findAll() {
                //         @Query("role", new ParseEnumPipe(PersonRole, { optional: true }))
                //         role?: PersonRole,
                // ): Promise<Employee[]> {
                //         if (role) return this.employeeRepository.find All(role);
                return this.employeeRepository.findAll();
        }
        @Delete(":id")
        remove(@Param("id") id: string) {
                return this.employeeRepository.delete(id);
        }
}
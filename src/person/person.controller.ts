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
} from "@nestjs/common";
import { PersonRepository } from "./person.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { Person } from "./entities/person.entity";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Auth } from "../helper/decorator/auth.decorator";
import { FormDataRequest } from "nestjs-form-data";
import { PersonRole } from "../helper/class/profile.entity";
import { JWTAuthGuard } from "../auth/guard/jwt.guard";

@ApiTags("Person")
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("person")
export class PersonController {
    constructor(private readonly personRepository: PersonRepository) {}

    /**
     * @deprecated
     * Create person profile, only token from admin or manager can access this API
     * - Admin can create manager, resident and techinician
     * - Manager can create resident and technician
     *
     * Other role can not create person profile */
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
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.personRepository.create(createPersonDto);
    }

    /**
     * @deprecated
     * Create account, only token from admin or manager can access this API
     *
     * Account must associate with person profile
     */
    @ApiOperation({ summary: "Create account" })
    @Auth(PersonRole.ADMIN, PersonRole.MANAGER)
    @Patch("/:id/account")
    async createAccount(
        @Param("id") id: string,
        @Body() createAccountDto: CreateAccountDto,
    ): Promise<Person> {
        return await this.personRepository.createAccount(id, createAccountDto);
    }

    @ApiOperation({
        summary: "Get all person profile",
        deprecated: true,
    })
    @ApiQuery({ name: "role", enum: PersonRole, required: false })
    @Get()
    findAll(
        @Query("role", new ParseEnumPipe(PersonRole, { optional: true }))
        role?: PersonRole,
    ): Promise<Person[]> {
        if (role) return this.personRepository.findAll(role);
        return this.personRepository.findAll();
    }
}

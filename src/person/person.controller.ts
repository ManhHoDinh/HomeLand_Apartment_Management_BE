import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UseGuards,
    Get,
    UploadedFiles,
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
    ApiTags,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Person, PersonRole } from "./entities/person.entity";
import { MBtoBytes } from "../helper/validation";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Auth } from "../helper/decorator/auth.decorator";
import { JWTAuthGuard } from "../helper/guard/jwt.guard";
import { ValidateImagePipe } from "../helper/pipe/validate-file-pipe.pipe";

@ApiTags("Person")
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("person")
export class PersonController {
    constructor(
        private readonly personRepository: PersonRepository,
    ) {}

    /**
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
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: "front_identify_card_photo",
                maxCount: 1,
            },
            {
                name: "back_identify_card_photo",
                maxCount: 1,
            },
        ]),
    )
    create(
        @UploadedFiles(
            new ValidateImagePipe([
                {
                    name: "front_identify_card_photo",
                    limit: MBtoBytes(15),
                },
                {
                    name: "back_identify_card_photo",
                    limit: MBtoBytes(15),
                },
            ]),
        )
        files: {
            front_identify_card_photo: Express.Multer.File;
            back_identify_card_photo: Express.Multer.File;
        },
        @Body() createPersonDto: CreatePersonDto,
    ) {
        return this.personRepository.create({
            ...createPersonDto,
            front_identify_card_photo:
                files.front_identify_card_photo,
            back_identify_card_photo: files.back_identify_card_photo,
        });
    }

    /**
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
        return await this.personRepository.createAccount(
            id,
            createAccountDto,
        );
    }

    @ApiOperation({
        summary: "Get all person profile",
    })
    @Get()
    findAll(
        @Query(
            "role",
            new ParseEnumPipe(PersonRole, { optional: true }),
        )
        role?: PersonRole,
    ): Promise<Person[]> {
        if (role) return this.personRepository.findAll(role);
        return this.personRepository.findAll();
    }
}

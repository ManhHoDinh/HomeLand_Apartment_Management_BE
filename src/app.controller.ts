import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { PersonRepository } from "./person/person.service";
import { CreatePersonDto } from "./person/dto/create-person.dto";
import {
    ApiConsumes,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateAccountDto } from "./person/dto/create-account.dto";
import { PersonRole } from "./person/entities/person.entity";
import { Auth } from "./helper/decorator/auth.decorator";
import { MemoryStoredFile } from "nestjs-form-data";

@ApiTags("DEVELOPMENT ONLY")
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly personRepository: PersonRepository,
    ) {}

    @Auth(PersonRole.MANAGER)
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    /**
     * Create account without need send token in header
     */
    @Post("/demo_account/:id")
    createAccount(
        @Param("id") id: string,
        @Body() createAccountDto: CreateAccountDto,
    ) {
        return this.personRepository.createAccount(id, createAccountDto);
    }

    /**
     * Create person profile without need send token in header
     */
    @ApiOperation({ summary: "Create person profile" })
    @ApiConsumes("multipart/form-data")
    @ApiUnprocessableEntityResponse({
        description: "Email or phone number already exists",
    })
    @ApiCreatedResponse({
        description: "Create person profile successfully",
    })
    @Post("/demo_person")
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
    createPerson(
        @UploadedFiles()
        files: {
            front_identify_card_photo: MemoryStoredFile[];
            back_identify_card_photo: MemoryStoredFile[];
        },
        @Body() createPersonDto: CreatePersonDto,
    ) {
        createPersonDto.front_identify_card_photo =
            files.front_identify_card_photo[0];
        createPersonDto.back_identify_card_photo =
            files.back_identify_card_photo[0];
        return this.personRepository.create(createPersonDto);
    }
}

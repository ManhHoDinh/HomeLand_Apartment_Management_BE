import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import {
    PersonRepository,
    PersonService,
} from "./person/person.service";
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
import { ValidateFilePipe } from "./helper/pipe";
import { MBtoBytes } from "./helper/validation";

@ApiTags("demo")
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly personRepository: PersonRepository,
    ) {}

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
        return this.personRepository.createAccount(
            id,
            createAccountDto,
        );
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
        @UploadedFiles(
            new ValidateFilePipe([
                {
                    name: "front_identify_card_photo",
                    limit: MBtoBytes(15),
                    mimetypes: ["image/jpeg", "image/png"],
                },
                {
                    name: "back_identify_card_photo",
                    limit: MBtoBytes(15),
                    mimetypes: ["image/jpeg", "image/png"],
                },
            ]),
        )
        files: {
            front_identify_card_photo: Express.Multer.File;
            back_identify_card_photo: Express.Multer.File;
        },
        @Body() createPersonDto: CreatePersonDto,
    ) {
        createPersonDto.front_identify_card_photo =
            files.front_identify_card_photo;
        createPersonDto.back_identify_card_photo =
            files.back_identify_card_photo;
        return this.personRepository.create(createPersonDto);
    }

    @Get("/me")
    getMe(@Req() req) {
        return req.user;
    }
}

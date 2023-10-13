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
import { PersonRepository } from "./person/person.service";
import { CreatePersonDto } from "./person/dto/create-person.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateAccountDto } from "./person/dto/create-account.dto";
import { ValidateFilePipe } from "./helper/pipe";
import { MBtoBytes } from "./helper/validation";

@ApiTags("demo")
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly personRepository: PersonRepository
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    /**
     * Create account without need send token in header
     */
    @Post("/demo_account/:id")
    create(
        @Param("id") id: string,
        @Body() createAccountDto: CreateAccountDto
    ) {
        return this.personRepository.createAccount(id, createAccountDto);
    }

    /**
     * Create person profile without need send token in header
     */
    @ApiConsumes("multipart/form-data")
    @Post("/demo_person")
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: "front_identify_card_photo_URL",
                maxCount: 1,
            },
            {
                name: "back_identify_card_photo_URL",
                maxCount: 1,
            },
        ])
    )
    async createAdmin(
        @UploadedFiles(
            new ValidateFilePipe([
                {
                    name: "front_identify_card_photo_URL",
                    limit: MBtoBytes(15),
                    mimetypes: ["image/jpeg", "image/png"],
                },
                {
                    name: "back_identify_card_photo_URL",
                    limit: MBtoBytes(15),
                    mimetypes: ["image/jpeg", "image/png"],
                },
            ])
        )
        files: {
            front_identify_card_photo_URL?: Express.Multer.File[];
            back_identify_card_photo_URL?: Express.Multer.File[];
        },
        @Body() createPersonDto: CreatePersonDto
    ) {
        createPersonDto.front_identify_card_photo_URL =
            files.front_identify_card_photo_URL![0];
        createPersonDto.back_identify_card_photo_URL =
            files.back_identify_card_photo_URL![0];
        return await this.personRepository.create(createPersonDto);
    }

    @Get("/me")
    getMe(@Req() req) {
        return req.user;
    }
}

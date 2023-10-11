import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UseGuards,
    Get,
    UploadedFiles,
} from "@nestjs/common";
import { PersonRepository } from "./person.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { JWTAuthGuard } from "../helper/guard/jwt.guard";
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiCreatedResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ValidateFilePipe } from "../helper/pipe/validateFilePipe.pipe";
import { Person } from "./entities/person.entity";

export const MBtoBytes = (mb: number) => mb * 1000000;

@ApiTags("person")
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller("person")
export class PersonController {
    constructor(private readonly personService: PersonRepository) {}

    /**
     * Create person profile, only token from admin or manager can access this API
     * - Admin can create manager, manager, resident and techinician
     * - Manager can create resident and technician
     * 
     * Other role can not create person profile */

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
                name: "front_identify_card_photo_URL",
                maxCount: 1,
            },
            {
                name: "back_identify_card_photo_URL",
                maxCount: 1,
            },
        ])
    )
    create(
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
        return this.personService.create(createPersonDto);
    }

    @Get()
    findAll(): Promise<Person[]> {
        return this.personService.findAll();
    }
}

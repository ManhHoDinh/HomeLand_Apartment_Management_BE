import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UseInterceptors,
    UploadedFiles,
} from "@nestjs/common";
import { ApartmentRepository } from "./apartment.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ValidateImagePipe } from "../helper/pipe/validate-file-pipe.pipe";
import { MBtoBytes } from "../helper/validation";

@ApiTags("Apartment")
@Controller("apartment")
export class ApartmentController {
    constructor(
        private readonly apartmentRepository: ApartmentRepository,
    ) {}

    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: "images",
            },
        ]),
    )
    @Post()
    create(
        @UploadedFiles(
            new ValidateImagePipe([
                {
                    name: "images",
                    limit: MBtoBytes(5),
                },
            ]),
        )
        file: { images: Express.Multer.File[] },
        @Body() createApartmentDto: CreateApartmentDto,
    ) {
        return this.apartmentRepository.create({
            ...createApartmentDto,
            images: file.images,
        });
    }

    @Get()
    findAll() {
        return this.apartmentRepository.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        const apartment = await this.apartmentRepository.findOne(id);
        if (apartment) return apartment;
        throw new NotFoundException("Apartment not found");
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateApartmentDto: UpdateApartmentDto,
    ) {
        const result = await this.apartmentRepository.update(
            id,
            updateApartmentDto,
        );
        if (result) return { msg: "Apartment updated" };
        throw new NotFoundException("Apartment not found");
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        const result = await this.apartmentRepository.softDelete(id);
        if (result) return { msg: "Apartment deleted" };
        throw new NotFoundException("Apartment not found");
    }
}

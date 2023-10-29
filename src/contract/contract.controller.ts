import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Redirect,
    Query,
    UseGuards,
    UploadedFile,
    ParseFilePipe,
    NotFoundException,
} from "@nestjs/common";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { Auth } from "src/helper/decorator/auth.decorator";
import { ApiConsumes } from "@nestjs/swagger";
import { FormDataRequest } from "nestjs-form-data";

@Controller("contract")
export class ContractController {
    constructor(private readonly contractService: ContractService) {}
    @Post()
    @ApiConsumes("multipart/form-data")
    @FormDataRequest()
    create(@Body() createContractDto: CreateContractDto) {
        return this.contractService.create(createContractDto);
    }

    @Get()
    findAll() {
        return this.contractService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.contractService.findOne(id);
    }

    @Patch(":id")
    @ApiConsumes("multipart/form-data")
    @FormDataRequest()
    async update(
        @Param("id") id: string,
        @Body() updateContractDto: UpdateContractDto,
    ) {
        const result = await this.contractService.update(id, updateContractDto);
        if (result)
            return [{ msg: "Contract updated" }, await this.findOne(id)];
        throw new NotFoundException("Contract not found");
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.contractService.remove(id);
    }
}

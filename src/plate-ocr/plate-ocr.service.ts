import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import FormData from "form-data";

export abstract class PlateOCRService {
    abstract getPlateNumberFromImage(
        buffer: Buffer | ArrayBuffer,
    ): Promise<string>;
}

@Injectable()
export class PlateOCRServiceImp implements PlateOCRService {
    constructor(private readonly httpService: HttpService) {}
    async getPlateNumberFromImage(
        buffer: Buffer | ArrayBuffer,
    ): Promise<string> {
        let formData = new FormData();
        formData.append("upload", buffer, { filename: "image" });
        const config = {
            url: "https://api.platerecognizer.com/v1/plate-reader/",
            method: "post",
            data: formData,
            headers: {
                ...formData.getHeaders(),
                Authorization: `Token ${process.env.PLATE_RECOGNIZER_API_KEY}`,
            },
        };
        try {
            const res = await this.httpService.axiosRef.request(config);

            return res.data.results[0].plate;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

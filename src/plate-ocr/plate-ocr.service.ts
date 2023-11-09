import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import FormData from "form-data";

export abstract class PlateOCRService {
    /**
     *  Get plate number from image
     * @param buffer bufer òf the image
     * @returns [plateNumber, error]
     */
    abstract getPlateNumberFromImage(
        buffer: Buffer | ArrayBuffer,
    ): Promise<[string | undefined, any | undefined]>;
}

export class NoPlateDetectedError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

@Injectable()
export class PlateOCRServiceImp implements PlateOCRService {
    constructor(private readonly httpService: HttpService) {}
    async getPlateNumberFromImage(
        buffer: Buffer | ArrayBuffer,
    ): Promise<[string | undefined, any | undefined]> {
        let formData = new FormData();
        formData.append("upload", buffer, { filename: "image" });
        formData.append("regions", "vn");
        formData.append("config", '{"region":"strict"}');
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
            if (res.data.results.length == 0)
                return [
                    undefined,
                    new NoPlateDetectedError("No plate detected"),
                ];

            return [res.data.results[0].plate, null];
        } catch (error) {
            console.error(error);
            return [undefined, error];
        }
    }
}

import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";
import { Repository } from "typeorm";
import { IdGenerator } from "../id-generator/id-generator.service";
import { ServicePackage } from "../service-package/entities/service-package.entity";

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice)
        private invoiceRepository: Repository<Invoice>,
        @InjectRepository(ServicePackage)
        private servicePackageRepository: Repository<ServicePackage>,
        private readonly idGenerate: IdGenerator,
    ) {}

    async create(createInvoiceDto: CreateInvoiceDto, id?: string) {
        let invoice = this.invoiceRepository.create(createInvoiceDto);
        invoice.invoice_id = "Inv" + this.idGenerate.generateId().toString();
        if (id) invoice.invoice_id = id;
        let servicePackage = await this.servicePackageRepository.findOne({
            where: { servicePackage_id: invoice.servicePackage_id },
        });
        invoice.total = invoice.amount * (servicePackage?.per_unit_price ?? 1);

        // Calculate the expiration date
        const currentDate = new Date();
        const expirationDate = new Date();
        expirationDate.setDate(
            currentDate.getDate() + (servicePackage?.expired_date ?? 0),
        );
        invoice.expired_at = expirationDate;
        return await this.invoiceRepository.save(invoice);
    }

    async findAll() {
        return await this.invoiceRepository.find({
            relations: ["servicePackage", "buyer"],
            cache: true,
        });
    }
    convertJsonToParams(jsonObject: any): string {
        const params = new URLSearchParams();

        for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                params.append(key, jsonObject[key]);
            }
        }

        return params.toString();
    }
    async payment(createInvoiceDto: CreateInvoiceDto) {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var accessKey = "F8BBA842ECF85";
        var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var orderInfo = "pay with MoMo";
        var partnerCode = "MOMO";
        var redirectUrl =
            "http://localhost:3000/invoice?" +
            this.convertJsonToParams(createInvoiceDto);
        var ipnUrl =
            "http://localhost:3000/invoice/create?" +
            this.convertJsonToParams(createInvoiceDto);
        console.log(ipnUrl);
        const jsonObject = {
            key1: "value1",
            key2: "value2",
            key3: "value3",
        };

        var requestType = "payWithMethod";
        var amount = "50000";
        var orderId = partnerCode + new Date().getTime();
        var requestId = orderId;
        var extraData = "";
        var paymentCode =
            "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
        var orderGroupId = "";
        var autoCapture = true;
        var lang = "vi";

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
            "accessKey=" +
            accessKey +
            "&amount=" +
            amount +
            "&extraData=" +
            extraData +
            "&ipnUrl=" +
            ipnUrl +
            "&orderId=" +
            orderId +
            "&orderInfo=" +
            orderInfo +
            "&partnerCode=" +
            partnerCode +
            "&redirectUrl=" +
            redirectUrl +
            "&requestId=" +
            requestId +
            "&requestType=" +
            requestType;
        //puts raw signature
        
        console.log("--------------------RAW SIGNATURE----------------");
        console.log(rawSignature);
        //signature
        const crypto = require("crypto");
        var signature = crypto
            .createHmac("sha256", secretKey)
            .update(rawSignature)
            .digest("hex");
        console.log("--------------------SIGNATURE----------------");
        console.log(signature);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });
        //Create the HTTPS objects
        const https = require("https");
        const options = {
            hostname: "test-payment.momo.vn",
            port: 443,
            path: "/v2/gateway/api/create",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(requestBody),
            },
        };
        //Send the request and get the response
        const req = await https.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            res.on("data", (body) => {
                console.log("Body: ");
                console.log(body);
                console.log("resultCode: ");
                console.log(JSON.parse(body).resultCode);
            });
            res.on("end", () => {
                console.log("No more data in response.");
            });
        });

        req.on("error", (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log("Sending....");
        // req.write(requestBody);

        return req.write(requestBody).data;
    }
    async findOne(id: string) {
        return await this.invoiceRepository.findOne({
            where: {
                invoice_id: id,
            },
            relations: ["servicePackage", "buyer"],
            cache: true,
        });
    }

    async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
        return `This action updates a #${id} invoice`;
    }

    async remove(id: string) {
        return await this.invoiceRepository.softDelete({
            invoice_id: id,
        });
    }
}

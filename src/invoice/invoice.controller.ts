import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Controller("invoice")
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Post()
    create(@Body() createInvoiceDto: CreateInvoiceDto) {
        // Node v10.15.3
        const axios = require("axios").default; // npm install axios
        const CryptoJS = require("crypto-js"); // npm install crypto-js
        const moment = require("moment"); // npm install moment

        // APP INFO
        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://openapi.zalopay.vn/v2/create",
        };

        const embed_data = {};

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: en.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 1000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "zalopayapp",
            mac: "",
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data =
            config.app_id +
            "|" +
            order.app_trans_id +
            "|" +
            order.app_user +
            "|" +
            order.amount +
            "|" +
            order.app_time +
            "|" +
            order.embed_data +
            "|" +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        axios
            .post(config.endpoint, null, { params: order })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        return this.invoiceService.create(createInvoiceDto);
    }

    @Get()
    findAll() {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = "pay with MoMo";
        var redirectUrl =
            "https://github.com/phuochungus/HomeLand_PHP/tree/ACC/database";
        var ipnUrl = "https://callback.url/notify";
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var amount = "50000";
        var requestType = "captureWallet";
        var extraData = ""; //pass empty value if your merchant does not have stores

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
            .createHmac("sha256", secretkey)
            .update(rawSignature)
            .digest("hex");
        console.log("--------------------SIGNATURE----------------");
        console.log(signature);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: "en",
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
        const req = https.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            res.on("data", (body) => {
                console.log("Body: ");
                console.log(body);
                console.log("payUrl: ");
                console.log(JSON.parse(body).payUrl);
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
        req.write(requestBody);
        req.end();

        return this.invoiceService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.invoiceService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateInvoiceDto: UpdateInvoiceDto,
    ) {
        return this.invoiceService.update(+id, updateInvoiceDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.invoiceService.remove(+id);
    }
}

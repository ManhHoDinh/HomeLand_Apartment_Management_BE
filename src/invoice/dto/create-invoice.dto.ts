import { OmitType } from "@nestjs/swagger";
import { Invoice } from "../entities/invoice.entity";

export class CreateInvoiceDto extends OmitType(Invoice, [
    "servicePackage","invoice_id","buyer","created_at",
    "deleted_at",
] as const) {}

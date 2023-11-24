import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from "typeorm";
import { Apartment } from "./entities/apartment.entity";
import { OnModuleInit } from "@nestjs/common";
import { Client } from "@elastic/elasticsearch";

@EventSubscriber()
export class ApartmentSubcriber
    implements EntitySubscriberInterface<Apartment>, OnModuleInit
{
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    // private elasticSearchClient = new Client({
    //     host: "localhost:9200",
    // });
    onModuleInit(): void {}

    listenTo() {
        return Apartment;
    }

    afterInsert(event: InsertEvent<Apartment>): void | Promise<any> {
        console.log(event.entity);
    }
}

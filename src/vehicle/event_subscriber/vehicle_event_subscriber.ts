import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { EntitySubscriberInterface } from "typeorm/browser";
import { Vehicle } from "../entities/vehicle.entity";
import { BadRequestException } from "@nestjs/common";

@EventSubscriber()
export class VehicleSubscriber implements EntitySubscriberInterface<Vehicle> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Vehicle;
    }

    beforeInsert(event: InsertEvent<Vehicle>) {
        const entity = event.entity;
        this.throwBadRequestIfUserIdEmpty(entity);
    }

    throwBadRequestIfUserIdEmpty(vehicle: Vehicle) {
        if (!vehicle.residentId)
            throw new BadRequestException("Resident id cannot be empty");
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalDeliveryDateForASupplyOrder } from 'app/shared/models/typical-delivery-date-for-a-supply-order';

@Injectable()

export class TypicalDeliveryDateForASupplyOrderService extends DataService<TypicalDeliveryDateForASupplyOrder> {
    constructor(http: HttpClient) {
        super('typicaldeliverydateforasupplyorder', http);
    }
}


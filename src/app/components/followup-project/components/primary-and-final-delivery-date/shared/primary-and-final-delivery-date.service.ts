import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PrimaryAndFinalDeliveryDate } from 'app/shared/models/primary-and-final-delivery-date';

@Injectable()

export class PrimaryAndFinalDeliveryDateService extends DataService<PrimaryAndFinalDeliveryDate> {
    constructor(http: HttpClient) {
        super('primaryandfinaldeliverydate', http);
    }
}


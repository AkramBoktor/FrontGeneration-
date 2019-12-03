import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FactoryNameForOrder } from 'app/shared/models/factory-name-for-order';

@Injectable()

export class FactoryNameForOrderService extends DataService<FactoryNameForOrder> {
    constructor(http: HttpClient) {
        super('factorynamefororder', http);
    }
}


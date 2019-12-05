import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalIssuingASupplyOrder } from 'app/shared/models/typical-issuing-a-supply-order';

@Injectable()

export class TypicalIssuingASupplyOrderService extends DataService<TypicalIssuingASupplyOrder> {
    constructor(http: HttpClient) {
        super('typicalissuingasupplyorder', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TransferOfSupplyOrdersFromSchoolsClosure } from 'app/shared/models/transfer-of-supply-orders-from-schools-closure';

@Injectable()

export class TransferOfSupplyOrdersFromSchoolsClosureService extends DataService<TransferOfSupplyOrdersFromSchoolsClosure> {
    constructor(http: HttpClient) {
        super('transferofsupplyordersfromschoolsclosure', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordTheClaimFormWithTheExchangeItem } from 'app/shared/models/record-the-claim-form-with-the-exchange-item';

@Injectable()

export class RecordTheClaimFormWithTheExchangeItemService extends DataService<RecordTheClaimFormWithTheExchangeItem> {
    constructor(http: HttpClient) {
        super('recordtheclaimformwiththeexchangeitem', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BillTelephoneLines } from 'app/shared/models/bill-telephone-lines';

@Injectable()

export class BillTelephoneLinesService extends DataService<BillTelephoneLines> {
    constructor(http: HttpClient) {
        super('billtelephonelines', http);
    }
}


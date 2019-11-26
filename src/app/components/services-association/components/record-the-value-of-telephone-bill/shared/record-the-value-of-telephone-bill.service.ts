import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordTheValueOfTelephoneBill } from 'app/shared/models/record-the-value-of-telephone-bill';

@Injectable()

export class RecordTheValueOfTelephoneBillService extends DataService<RecordTheValueOfTelephoneBill> {
    constructor(http: HttpClient) {
        super('recordthevalueoftelephonebill', http);
    }
}


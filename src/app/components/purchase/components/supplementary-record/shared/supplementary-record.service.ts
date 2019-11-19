import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SupplementaryRecord } from 'app/shared/models/supplementary-record';

@Injectable()

export class SupplementaryRecordService extends DataService<SupplementaryRecord> {
    constructor(http: HttpClient) {
        super('supplementaryrecord', http);
    }
}


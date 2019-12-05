import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataWithdrawalNote } from 'app/shared/models/data-withdrawal-note';

@Injectable()

export class DataWithdrawalNoteService extends DataService<DataWithdrawalNote> {
    constructor(http: HttpClient) {
        super('datawithdrawalnote', http);
    }
}


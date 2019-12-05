import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataEntryForm129Corrections } from 'app/shared/models/data-entry-form-129-corrections';

@Injectable()

export class DataEntryForm129CorrectionsService extends DataService<DataEntryForm129Corrections> {
    constructor(http: HttpClient) {
        super('dataentryform129corrections', http);
    }
}


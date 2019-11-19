import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TenderData } from 'app/shared/models/tender-data';

@Injectable()

export class TenderDataService extends DataService<TenderData> {
    constructor(http: HttpClient) {
        super('tenderdata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FundsFromAFundingSource } from 'app/shared/models/funds-from-a-funding-source';

@Injectable()

export class FundsFromAFundingSourceService extends DataService<FundsFromAFundingSource> {
    constructor(http: HttpClient) {
        super('fundsfromafundingsource', http);
    }
}


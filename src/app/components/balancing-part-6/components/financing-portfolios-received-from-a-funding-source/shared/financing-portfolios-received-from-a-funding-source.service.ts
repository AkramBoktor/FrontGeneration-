import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FinancingPortfoliosReceivedFromAFundingSource } from 'app/shared/models/financing-portfolios-received-from-a-funding-source';

@Injectable()

export class FinancingPortfoliosReceivedFromAFundingSourceService extends DataService<FinancingPortfoliosReceivedFromAFundingSource> {
    constructor(http: HttpClient) {
        super('financingportfoliosreceivedfromafundingsource', http);
    }
}


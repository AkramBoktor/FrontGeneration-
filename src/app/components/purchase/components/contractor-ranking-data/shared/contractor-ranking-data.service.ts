import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractorRankingData } from 'app/shared/models/contractor-ranking-data';

@Injectable()

export class ContractorRankingDataService extends DataService<ContractorRankingData> {
    constructor(http: HttpClient) {
        super('contractorrankingdata', http);
    }
}


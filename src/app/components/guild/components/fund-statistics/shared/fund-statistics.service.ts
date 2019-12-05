import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FundStatistics } from 'app/shared/models/fund-statistics';

@Injectable()

export class FundStatisticsService extends DataService<FundStatistics> {
    constructor(http: HttpClient) {
        super('fundstatistics', http);
    }
}


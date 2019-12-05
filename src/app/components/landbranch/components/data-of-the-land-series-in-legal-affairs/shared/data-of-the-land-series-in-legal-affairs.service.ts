import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataOfTheLandSeriesInLegalAffairs } from 'app/shared/models/data-of-the-land-series-in-legal-affairs';

@Injectable()

export class DataOfTheLandSeriesInLegalAffairsService extends DataService<DataOfTheLandSeriesInLegalAffairs> {
    constructor(http: HttpClient) {
        super('dataofthelandseriesinlegalaffairs', http);
    }
}


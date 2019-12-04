import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AnalysisValue } from 'app/shared/models/analysis-value';

@Injectable()

export class AnalysisValueService extends DataService<AnalysisValue> {
    constructor(http: HttpClient) {
        super('analysisvalue', http);
    }
}


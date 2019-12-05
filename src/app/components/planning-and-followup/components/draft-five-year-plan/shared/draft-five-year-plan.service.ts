import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DraftFiveYearPlan } from 'app/shared/models/draft-five-year-plan';

@Injectable()

export class DraftFiveYearPlanService extends DataService<DraftFiveYearPlan> {
    constructor(http: HttpClient) {
        super('draftfiveyearplan', http);
    }
}


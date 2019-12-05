import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FiveYearPlan } from 'app/shared/models/five-year-plan';

@Injectable()

export class FiveYearPlanService extends DataService<FiveYearPlan> {
    constructor(http: HttpClient) {
        super('fiveyearplan', http);
    }
}


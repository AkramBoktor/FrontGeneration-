import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AnnualPlan } from 'app/shared/models/annual-plan';

@Injectable()

export class AnnualPlanService extends DataService<AnnualPlan> {
    constructor(http: HttpClient) {
        super('annualplan', http);
    }
}


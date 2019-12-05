import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CleanlinessBusinessPlan } from 'app/shared/models/cleanliness-business-plan';

@Injectable()

export class CleanlinessBusinessPlanService extends DataService<CleanlinessBusinessPlan> {
    constructor(http: HttpClient) {
        super('cleanlinessbusinessplan', http);
    }
}


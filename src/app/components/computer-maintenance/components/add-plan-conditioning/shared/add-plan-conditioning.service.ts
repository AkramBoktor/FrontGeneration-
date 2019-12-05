import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddPlanConditioning } from 'app/shared/models/add-plan-conditioning';

@Injectable()

export class AddPlanConditioningService extends DataService<AddPlanConditioning> {
    constructor(http: HttpClient) {
        super('addplanconditioning', http);
    }
}


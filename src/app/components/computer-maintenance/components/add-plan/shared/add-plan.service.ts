import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddPlan } from 'app/shared/models/add-plan';

@Injectable()

export class AddPlanService extends DataService<AddPlan> {
    constructor(http: HttpClient) {
        super('addplan', http);
    }
}


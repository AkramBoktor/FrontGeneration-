import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InternalTrainingPlans } from 'app/shared/models/internal-training-plans';

@Injectable()

export class InternalTrainingPlansService extends DataService<InternalTrainingPlans> {
    constructor(http: HttpClient) {
        super('internaltrainingplans', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DecisionOfTheDirectorOfTheCommission } from 'app/shared/models/decision-of-the-director-of-the-commission';

@Injectable()

export class DecisionOfTheDirectorOfTheCommissionService extends DataService<DecisionOfTheDirectorOfTheCommission> {
    constructor(http: HttpClient) {
        super('decisionofthedirectorofthecommission', http);
    }
}


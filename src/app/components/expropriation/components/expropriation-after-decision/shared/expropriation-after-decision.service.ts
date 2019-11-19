import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExpropriationAfterDecision } from 'app/shared/models/expropriation-after-decision';

@Injectable()

export class ExpropriationAfterDecisionService extends DataService<ExpropriationAfterDecision> {
    constructor(http: HttpClient) {
        super('expropriationafterdecision', http);
    }
}


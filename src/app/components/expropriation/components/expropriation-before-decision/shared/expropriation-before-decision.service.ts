import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExpropriationBeforeDecision } from 'app/shared/models/expropriation-before-decision';

@Injectable()

export class ExpropriationBeforeDecisionService extends DataService<ExpropriationBeforeDecision> {
    constructor(http: HttpClient) {
        super('expropriationbeforedecision', http);
    }
}


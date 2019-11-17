import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExpropriationDataBeforeThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-before-the-prime-minister-decision';

@Injectable()

export class ExpropriationDataBeforeThePrimeMinisterDecisionService extends DataService<ExpropriationDataBeforeThePrimeMinisterDecision> {
    constructor(http: HttpClient) {
        super('expropriationdatabeforetheprimeministerdecision', http);
    }
}


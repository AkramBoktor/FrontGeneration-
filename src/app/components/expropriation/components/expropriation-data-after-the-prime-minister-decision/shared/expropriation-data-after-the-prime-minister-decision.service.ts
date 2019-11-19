import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExpropriationDataAfterThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-after-the-prime-minister-decision';

@Injectable()

export class ExpropriationDataAfterThePrimeMinisterDecisionService extends DataService<ExpropriationDataAfterThePrimeMinisterDecision> {
    constructor(http: HttpClient) {
        super('expropriationdataaftertheprimeministerdecision', http);
    }
}


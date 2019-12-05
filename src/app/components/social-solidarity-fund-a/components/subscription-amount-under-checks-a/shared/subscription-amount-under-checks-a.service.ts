import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriptionAmountUnderChecksA } from 'app/shared/models/subscription-amount-under-checks-a';

@Injectable()

export class SubscriptionAmountUnderChecksAService extends DataService<SubscriptionAmountUnderChecksA> {
    constructor(http: HttpClient) {
        super('subscriptionamountunderchecksa', http);
    }
}


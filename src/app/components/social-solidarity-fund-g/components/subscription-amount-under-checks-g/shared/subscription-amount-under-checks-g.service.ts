import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriptionAmountUnderChecksG } from 'app/shared/models/subscription-amount-under-checks-g';

@Injectable()

export class SubscriptionAmountUnderChecksGService extends DataService<SubscriptionAmountUnderChecksG> {
    constructor(http: HttpClient) {
        super('subscriptionamountunderchecksg', http);
    }
}


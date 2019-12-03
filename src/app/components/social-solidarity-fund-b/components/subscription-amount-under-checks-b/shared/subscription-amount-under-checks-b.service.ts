import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriptionAmountUnderChecksB } from 'app/shared/models/subscription-amount-under-checks-b';

@Injectable()

export class SubscriptionAmountUnderChecksBService extends DataService<SubscriptionAmountUnderChecksB> {
    constructor(http: HttpClient) {
        super('subscriptionamountunderchecksb', http);
    }
}


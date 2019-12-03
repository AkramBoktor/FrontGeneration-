import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriptionValueByAgeB } from 'app/shared/models/subscription-value-by-age-b';

@Injectable()

export class SubscriptionValueByAgeBService extends DataService<SubscriptionValueByAgeB> {
    constructor(http: HttpClient) {
        super('subscriptionvaluebyageb', http);
    }
}


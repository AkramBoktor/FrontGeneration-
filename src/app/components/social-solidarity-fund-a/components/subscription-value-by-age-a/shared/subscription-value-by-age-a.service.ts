import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriptionValueByAgeA } from 'app/shared/models/subscription-value-by-age-a';

@Injectable()

export class SubscriptionValueByAgeAService extends DataService<SubscriptionValueByAgeA> {
    constructor(http: HttpClient) {
        super('subscriptionvaluebyagea', http);
    }
}


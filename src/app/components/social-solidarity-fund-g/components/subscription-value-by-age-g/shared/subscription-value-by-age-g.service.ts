import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriptionValueByAgeG } from 'app/shared/models/subscription-value-by-age-g';

@Injectable()

export class SubscriptionValueByAgeGService extends DataService<SubscriptionValueByAgeG> {
    constructor(http: HttpClient) {
        super('subscriptionvaluebyageg', http);
    }
}


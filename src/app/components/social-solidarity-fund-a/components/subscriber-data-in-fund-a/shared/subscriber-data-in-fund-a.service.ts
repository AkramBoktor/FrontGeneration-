import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriberDataInFundA } from 'app/shared/models/subscriber-data-in-fund-a';

@Injectable()

export class SubscriberDataInFundAService extends DataService<SubscriberDataInFundA> {
    constructor(http: HttpClient) {
        super('subscriberdatainfunda', http);
    }
}


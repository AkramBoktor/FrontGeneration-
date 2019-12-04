import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriberDataInFundG } from 'app/shared/models/subscriber-data-in-fund-g';

@Injectable()

export class SubscriberDataInFundGService extends DataService<SubscriberDataInFundG> {
    constructor(http: HttpClient) {
        super('subscriberdatainfundg', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriberData } from 'app/shared/models/subscriber-data';

@Injectable()

export class SubscriberDataService extends DataService<SubscriberData> {
    constructor(http: HttpClient) {
        super('subscriberdata', http);
    }
}


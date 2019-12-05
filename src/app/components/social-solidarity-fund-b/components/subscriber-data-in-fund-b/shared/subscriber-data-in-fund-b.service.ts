import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubscriberDataInFundB } from 'app/shared/models/subscriber-data-in-fund-b';

@Injectable()

export class SubscriberDataInFundBService extends DataService<SubscriberDataInFundB> {
    constructor(http: HttpClient) {
        super('subscriberdatainfundb', http);
    }
}


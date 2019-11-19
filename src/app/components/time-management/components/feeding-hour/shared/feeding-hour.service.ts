import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FeedingHour } from 'app/shared/models/feeding-hour';

@Injectable()

export class FeedingHourService extends DataService<FeedingHour> {
    constructor(http: HttpClient) {
        super('feedinghour', http);
    }
}


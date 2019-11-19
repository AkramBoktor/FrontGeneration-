import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PublishingData } from 'app/shared/models/publishing-data';

@Injectable()

export class PublishingDataService extends DataService<PublishingData> {
    constructor(http: HttpClient) {
        super('publishingdata', http);
    }
}


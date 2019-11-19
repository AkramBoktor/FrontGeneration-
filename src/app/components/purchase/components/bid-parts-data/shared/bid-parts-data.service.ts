import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BidPartsData } from 'app/shared/models/bid-parts-data';

@Injectable()

export class BidPartsDataService extends DataService<BidPartsData> {
    constructor(http: HttpClient) {
        super('bidpartsdata', http);
    }
}


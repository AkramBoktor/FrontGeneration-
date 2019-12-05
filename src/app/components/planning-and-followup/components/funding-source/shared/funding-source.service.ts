import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FundingSource } from 'app/shared/models/funding-source';

@Injectable()

export class FundingSourceService extends DataService<FundingSource> {
    constructor(http: HttpClient) {
        super('fundingsource', http);
    }
}


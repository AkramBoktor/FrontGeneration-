import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CastingDataForSample } from 'app/shared/models/casting-data-for-sample';

@Injectable()

export class CastingDataForSampleService extends DataService<CastingDataForSample> {
    constructor(http: HttpClient) {
        super('castingdataforsample', http);
    }
}


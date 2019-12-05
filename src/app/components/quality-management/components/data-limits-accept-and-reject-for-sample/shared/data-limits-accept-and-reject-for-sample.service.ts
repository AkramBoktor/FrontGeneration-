import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataLimitsAcceptAndRejectForSample } from 'app/shared/models/data-limits-accept-and-reject-for-sample';

@Injectable()

export class DataLimitsAcceptAndRejectForSampleService extends DataService<DataLimitsAcceptAndRejectForSample> {
    constructor(http: HttpClient) {
        super('datalimitsacceptandrejectforsample', http);
    }
}


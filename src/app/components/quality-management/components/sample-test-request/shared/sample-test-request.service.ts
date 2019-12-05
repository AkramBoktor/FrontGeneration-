import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SampleTestRequest } from 'app/shared/models/sample-test-request';

@Injectable()

export class SampleTestRequestService extends DataService<SampleTestRequest> {
    constructor(http: HttpClient) {
        super('sampletestrequest', http);
    }
}


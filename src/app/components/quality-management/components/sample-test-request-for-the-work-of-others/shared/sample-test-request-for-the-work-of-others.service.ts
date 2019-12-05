import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SampleTestRequestForTheWorkOfOthers } from 'app/shared/models/sample-test-request-for-the-work-of-others';

@Injectable()

export class SampleTestRequestForTheWorkOfOthersService extends DataService<SampleTestRequestForTheWorkOfOthers> {
    constructor(http: HttpClient) {
        super('sampletestrequestfortheworkofothers', http);
    }
}


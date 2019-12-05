import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SampleResult } from 'app/shared/models/sample-result';

@Injectable()

export class SampleResultService extends DataService<SampleResult> {
    constructor(http: HttpClient) {
        super('sampleresult', http);
    }
}


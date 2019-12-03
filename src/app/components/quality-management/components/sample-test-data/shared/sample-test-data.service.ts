import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SampleTestData } from 'app/shared/models/sample-test-data';

@Injectable()

export class SampleTestDataService extends DataService<SampleTestData> {
    constructor(http: HttpClient) {
        super('sampletestdata', http);
    }
}


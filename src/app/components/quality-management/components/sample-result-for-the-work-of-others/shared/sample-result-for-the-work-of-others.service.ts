import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SampleResultForTheWorkOfOthers } from 'app/shared/models/sample-result-for-the-work-of-others';

@Injectable()

export class SampleResultForTheWorkOfOthersService extends DataService<SampleResultForTheWorkOfOthers> {
    constructor(http: HttpClient) {
        super('sampleresultfortheworkofothers', http);
    }
}


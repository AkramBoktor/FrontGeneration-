import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { JobData } from 'app/shared/models/job-data';

@Injectable()

export class JobDataService extends DataService<JobData> {
    constructor(http: HttpClient) {
        super('jobdata', http);
    }
}


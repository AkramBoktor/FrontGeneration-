import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { JobPlacementOfTheDepartmentsOfTheBody } from 'app/shared/models/job-placement-of-the-departments-of-the-body';

@Injectable()

export class JobPlacementOfTheDepartmentsOfTheBodyService extends DataService<JobPlacementOfTheDepartmentsOfTheBody> {
    constructor(http: HttpClient) {
        super('jobplacementofthedepartmentsofthebody', http);
    }
}


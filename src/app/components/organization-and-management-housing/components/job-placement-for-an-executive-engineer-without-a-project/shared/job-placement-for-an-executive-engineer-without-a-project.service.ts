import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { JobPlacementForAnExecutiveEngineerWithoutAProject } from 'app/shared/models/job-placement-for-an-executive-engineer-without-a-project';

@Injectable()

export class JobPlacementForAnExecutiveEngineerWithoutAProjectService extends DataService<JobPlacementForAnExecutiveEngineerWithoutAProject> {
    constructor(http: HttpClient) {
        super('jobplacementforanexecutiveengineerwithoutaproject', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ProjectPeriods } from 'app/shared/models/project-periods';

@Injectable()

export class ProjectPeriodsService extends DataService<ProjectPeriods> {
    constructor(http: HttpClient) {
        super('projectperiods', http);
    }
}


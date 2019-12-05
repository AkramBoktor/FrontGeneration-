import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ProjectData } from 'app/shared/models/project-data';

@Injectable()

export class ProjectDataService extends DataService<ProjectData> {
    constructor(http: HttpClient) {
        super('projectdata', http);
    }
}


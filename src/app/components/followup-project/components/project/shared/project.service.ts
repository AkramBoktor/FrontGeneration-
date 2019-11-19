import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Project } from 'app/shared/models/project';

@Injectable()

export class ProjectService extends DataService<Project> {
    constructor(http: HttpClient) {
        super('project', http);
    }
}


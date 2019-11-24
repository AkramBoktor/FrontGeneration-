import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AdjustThePositionOfProjects } from 'app/shared/models/adjust-the-position-of-projects';

@Injectable()

export class AdjustThePositionOfProjectsService extends DataService<AdjustThePositionOfProjects> {
    constructor(http: HttpClient) {
        super('adjustthepositionofprojects', http);
    }
}


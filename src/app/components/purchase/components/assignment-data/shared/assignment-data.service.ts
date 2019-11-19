import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssignmentData } from 'app/shared/models/assignment-data';

@Injectable()

export class AssignmentDataService extends DataService<AssignmentData> {
    constructor(http: HttpClient) {
        super('assignmentdata', http);
    }
}


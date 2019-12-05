import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolLab } from 'app/shared/models/school-lab';

@Injectable()

export class SchoolLabService extends DataService<SchoolLab> {
    constructor(http: HttpClient) {
        super('schoollab', http);
    }
}


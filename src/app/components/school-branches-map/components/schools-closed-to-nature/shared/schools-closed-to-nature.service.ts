import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolsClosedToNature } from 'app/shared/models/schools-closed-to-nature';

@Injectable()

export class SchoolsClosedToNatureService extends DataService<SchoolsClosedToNature> {
    constructor(http: HttpClient) {
        super('schoolsclosedtonature', http);
    }
}


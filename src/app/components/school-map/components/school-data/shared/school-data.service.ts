import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolData } from 'app/shared/models/school-data';

@Injectable()

export class SchoolDataService extends DataService<SchoolData> {
    constructor(http: HttpClient) {
        super('schooldata', http);
    }
}


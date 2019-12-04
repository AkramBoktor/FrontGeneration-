import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolPeriod } from 'app/shared/models/school-period';

@Injectable()

export class SchoolPeriodService extends DataService<SchoolPeriod> {
    constructor(http: HttpClient) {
        super('schoolperiod', http);
    }
}


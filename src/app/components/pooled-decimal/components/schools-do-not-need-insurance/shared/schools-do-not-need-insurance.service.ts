import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolsDoNotNeedInsurance } from 'app/shared/models/schools-do-not-need-insurance';

@Injectable()

export class SchoolsDoNotNeedInsuranceService extends DataService<SchoolsDoNotNeedInsurance> {
    constructor(http: HttpClient) {
        super('schoolsdonotneedinsurance', http);
    }
}


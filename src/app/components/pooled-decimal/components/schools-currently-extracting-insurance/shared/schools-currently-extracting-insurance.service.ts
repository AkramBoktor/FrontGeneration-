import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SchoolsCurrentlyExtractingInsurance} from 'app/shared/models/schools-currently-extracting-insurance';

@Injectable()

export class SchoolsCurrentlyExtractingInsuranceService extends DataService<SchoolsCurrentlyExtractingInsurance> {
    constructor(http: HttpClient) {
        super('schoolscurrentlyextractinginsurance', http);
    }
}


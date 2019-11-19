import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InsuranceCompaniesCodes } from 'app/shared/models/insurance-companies-codes';

@Injectable()

export class InsuranceCompaniesCodesService extends DataService<InsuranceCompaniesCodes> {
    constructor(http: HttpClient) {
        super('insurancecompaniescodes', http);
    }
}


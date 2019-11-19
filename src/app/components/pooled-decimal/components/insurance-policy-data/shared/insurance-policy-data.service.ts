import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InsurancePolicyData } from 'app/shared/models/insurance-policy-data';

@Injectable()

export class InsurancePolicyDataService extends DataService<InsurancePolicyData> {
    constructor(http: HttpClient) {
        super('insurancepolicydata', http);
    }
}


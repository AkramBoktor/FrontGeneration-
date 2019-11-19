import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExtensionInsurancePolicyData } from 'app/shared/models/extension-insurance-policy-data';

@Injectable()

export class ExtensionInsurancePolicyDataService extends DataService<ExtensionInsurancePolicyData> {
    constructor(http: HttpClient) {
        super('extensioninsurancepolicydata', http);
    }
}


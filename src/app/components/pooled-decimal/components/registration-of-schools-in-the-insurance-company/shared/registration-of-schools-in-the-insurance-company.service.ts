import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegistrationOfSchoolsInTheInsuranceCompany } from 'app/shared/models/registration-of-schools-in-the-insurance-company';

@Injectable()

export class RegistrationOfSchoolsInTheInsuranceCompanyService extends DataService<RegistrationOfSchoolsInTheInsuranceCompany> {
    constructor(http: HttpClient) {
        super('registrationofschoolsintheinsurancecompany', http);
    }
}


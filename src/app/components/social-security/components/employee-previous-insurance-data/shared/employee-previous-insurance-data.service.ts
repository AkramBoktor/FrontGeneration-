import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeePreviousInsuranceData } from 'app/shared/models/employee-previous-insurance-data';

@Injectable()

export class EmployeePreviousInsuranceDataService extends DataService<EmployeePreviousInsuranceData> {
    constructor(http: HttpClient) {
        super('employeepreviousinsurancedata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeInsuranceNumber } from 'app/shared/models/employee-insurance-number';

@Injectable()

export class EmployeeInsuranceNumberService extends DataService<EmployeeInsuranceNumber> {
    constructor(http: HttpClient) {
        super('employeeinsurancenumber', http);
    }
}


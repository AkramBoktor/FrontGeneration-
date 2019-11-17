import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeContractRenewalData } from 'app/shared/models/employee-contract-renewal-data';

@Injectable()

export class EmployeeContractRenewalDataService extends DataService<EmployeeContractRenewalData> {
    constructor(http: HttpClient) {
        super('employeecontractrenewaldata', http);
    }
}


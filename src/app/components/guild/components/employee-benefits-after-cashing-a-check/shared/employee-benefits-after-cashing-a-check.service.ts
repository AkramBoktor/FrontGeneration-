import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeBenefitsAfterCashingACheck } from 'app/shared/models/employee-benefits-after-cashing-a-check';

@Injectable()

export class EmployeeBenefitsAfterCashingACheckService extends DataService<EmployeeBenefitsAfterCashingACheck> {
    constructor(http: HttpClient) {
        super('employeebenefitsaftercashingacheck', http);
    }
}


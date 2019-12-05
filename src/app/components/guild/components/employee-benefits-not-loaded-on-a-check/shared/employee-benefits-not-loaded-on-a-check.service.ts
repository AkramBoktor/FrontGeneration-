import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeBenefitsNotLoadedOnACheck } from 'app/shared/models/employee-benefits-not-loaded-on-a-check';

@Injectable()

export class EmployeeBenefitsNotLoadedOnACheckService extends DataService<EmployeeBenefitsNotLoadedOnACheck> {
    constructor(http: HttpClient) {
        super('employeebenefitsnotloadedonacheck', http);
    }
}


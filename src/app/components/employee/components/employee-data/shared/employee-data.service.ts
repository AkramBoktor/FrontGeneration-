import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeData } from 'app/shared/models/employee-data';

@Injectable()

export class EmployeeDataService extends DataService<EmployeeData> {
    constructor(http: HttpClient) {
        super('employeedata', http);
    }
}


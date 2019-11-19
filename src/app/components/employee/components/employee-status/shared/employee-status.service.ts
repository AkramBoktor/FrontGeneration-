import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeStatus } from 'app/shared/models/employee-status';

@Injectable()

export class EmployeeStatusService extends DataService<EmployeeStatus> {
    constructor(http: HttpClient) {
        super('employeestatus', http);
    }
}


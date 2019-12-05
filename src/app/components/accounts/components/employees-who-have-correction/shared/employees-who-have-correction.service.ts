import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeesWhoHaveCorrection } from 'app/shared/models/employees-who-have-correction';

@Injectable()

export class EmployeesWhoHaveCorrectionService extends DataService<EmployeesWhoHaveCorrection> {
    constructor(http: HttpClient) {
        super('employeeswhohavecorrection', http);
    }
}


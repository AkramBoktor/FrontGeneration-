import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeEducationalQualifications } from 'app/shared/models/employee-educational-qualifications';

@Injectable()

export class EmployeeEducationalQualificationsService extends DataService<EmployeeEducationalQualifications> {
    constructor(http: HttpClient) {
        super('employeeeducationalqualifications', http);
    }
}


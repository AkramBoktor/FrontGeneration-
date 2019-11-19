import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeExperience } from 'app/shared/models/employee-experience';

@Injectable()

export class EmployeeExperienceService extends DataService<EmployeeExperience> {
    constructor(http: HttpClient) {
        super('employeeexperience', http);
    }
}


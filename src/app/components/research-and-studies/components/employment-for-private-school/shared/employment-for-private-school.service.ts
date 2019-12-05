import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmploymentForPrivateSchool } from 'app/shared/models/employment-for-private-school';

@Injectable()

export class EmploymentForPrivateSchoolService extends DataService<EmploymentForPrivateSchool> {
    constructor(http: HttpClient) {
        super('employmentforprivateschool', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SocialSecurityForEmployeeFamily } from 'app/shared/models/social-security-for-employee-family';

@Injectable()

export class SocialSecurityForEmployeeFamilyService extends DataService<SocialSecurityForEmployeeFamily> {
    constructor(http: HttpClient) {
        super('socialsecurityforemployeefamily', http);
    }
}


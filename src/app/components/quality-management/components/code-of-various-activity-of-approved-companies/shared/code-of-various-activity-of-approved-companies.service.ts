import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CodeOfVariousActivityOfApprovedCompanies } from 'app/shared/models/code-of-various-activity-of-approved-companies';

@Injectable()

export class CodeOfVariousActivityOfApprovedCompaniesService extends DataService<CodeOfVariousActivityOfApprovedCompanies> {
    constructor(http: HttpClient) {
        super('codeofvariousactivityofapprovedcompanies', http);
    }
}


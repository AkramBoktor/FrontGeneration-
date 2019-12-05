import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CodeOfApprovedCompaniesRepresentative } from 'app/shared/models/code-of-approved-companies-representative';

@Injectable()

export class CodeOfApprovedCompaniesRepresentativeService extends DataService<CodeOfApprovedCompaniesRepresentative> {
    constructor(http: HttpClient) {
        super('codeofapprovedcompaniesrepresentative', http);
    }
}


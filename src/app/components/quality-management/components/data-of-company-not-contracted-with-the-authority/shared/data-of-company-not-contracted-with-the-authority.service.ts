import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataOfCompanyNotContractedWithTheAuthority } from 'app/shared/models/data-of-company-not-contracted-with-the-authority';

@Injectable()

export class DataOfCompanyNotContractedWithTheAuthorityService extends DataService<DataOfCompanyNotContractedWithTheAuthority> {
    constructor(http: HttpClient) {
        super('dataofcompanynotcontractedwiththeauthority', http);
    }
}


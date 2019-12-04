import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataOfCompanyContractedWithTheAuthority } from 'app/shared/models/data-of-company-contracted-with-the-authority';

@Injectable()

export class DataOfCompanyContractedWithTheAuthorityService extends DataService<DataOfCompanyContractedWithTheAuthority> {
    constructor(http: HttpClient) {
        super('dataofcompanycontractedwiththeauthority', http);
    }
}


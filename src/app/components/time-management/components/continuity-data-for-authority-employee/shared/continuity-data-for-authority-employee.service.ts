import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContinuityDataForAuthorityEmployee } from 'app/shared/models/continuity-data-for-authority-employee';

@Injectable()

export class ContinuityDataForAuthorityEmployeeService extends DataService<ContinuityDataForAuthorityEmployee> {
    constructor(http: HttpClient) {
        super('continuitydataforauthorityemployee', http);
    }
}


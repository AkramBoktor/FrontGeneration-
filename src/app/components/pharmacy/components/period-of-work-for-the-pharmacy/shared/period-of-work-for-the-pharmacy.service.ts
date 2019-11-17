import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PeriodOfWorkForThePharmacy } from 'app/shared/models/period-of-work-for-the-pharmacy';

@Injectable()

export class PeriodOfWorkForThePharmacyService extends DataService<PeriodOfWorkForThePharmacy> {
    constructor(http: HttpClient) {
        super('periodofworkforthepharmacy', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PeriodOfWorkForTheClinic } from 'app/shared/models/period-of-work-for-the-clinic';

@Injectable()

export class PeriodOfWorkForTheClinicService extends DataService<PeriodOfWorkForTheClinic> {
    constructor(http: HttpClient) {
        super('periodofworkfortheclinic', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MonthlyCompletionOfConsultantContractPeriod } from 'app/shared/models/monthly-completion-of-consultant-contract-period';

@Injectable()

export class MonthlyCompletionOfConsultantContractPeriodService extends DataService<MonthlyCompletionOfConsultantContractPeriod> {
    constructor(http: HttpClient) {
        super('monthlycompletionofconsultantcontractperiod', http);
    }
}


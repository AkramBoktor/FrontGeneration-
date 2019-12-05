import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { StatementOfEmployeePerformanceDuringACertainPeriod } from 'app/shared/models/statement-of-employee-performance-during-a-certain-period';

@Injectable()

export class StatementOfEmployeePerformanceDuringACertainPeriodService extends DataService<StatementOfEmployeePerformanceDuringACertainPeriod> {
    constructor(http: HttpClient) {
        super('statementofemployeeperformanceduringacertainperiod', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DailyPrintErrorData } from 'app/shared/models/daily-print-error-data';

@Injectable()

export class DailyPrintErrorDataService extends DataService<DailyPrintErrorData> {
    constructor(http: HttpClient) {
        super('dailyprinterrordata', http);
    }
}


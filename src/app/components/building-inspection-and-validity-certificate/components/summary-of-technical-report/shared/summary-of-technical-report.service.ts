import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SummaryOfTechnicalReport } from 'app/shared/models/summary-of-technical-report';

@Injectable()

export class SummaryOfTechnicalReportService extends DataService<SummaryOfTechnicalReport> {
    constructor(http: HttpClient) {
        super('summaryoftechnicalreport', http);
    }
}


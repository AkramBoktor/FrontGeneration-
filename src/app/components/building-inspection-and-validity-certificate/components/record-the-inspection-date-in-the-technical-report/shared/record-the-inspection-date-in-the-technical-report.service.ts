import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordTheInspectionDateInTheTechnicalReport } from 'app/shared/models/record-the-inspection-date-in-the-technical-report';

@Injectable()

export class RecordTheInspectionDateInTheTechnicalReportService extends DataService<RecordTheInspectionDateInTheTechnicalReport> {
    constructor(http: HttpClient) {
        super('recordtheinspectiondateinthetechnicalreport', http);
    }
}


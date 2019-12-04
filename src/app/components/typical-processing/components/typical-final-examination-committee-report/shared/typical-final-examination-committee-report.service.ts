import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalFinalExaminationCommitteeReport } from 'app/shared/models/typical-final-examination-committee-report';

@Injectable()

export class TypicalFinalExaminationCommitteeReportService extends DataService<TypicalFinalExaminationCommitteeReport> {
    constructor(http: HttpClient) {
        super('typicalfinalexaminationcommitteereport', http);
    }
}


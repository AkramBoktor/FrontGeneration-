import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExaminationCommitteeDateData } from 'app/shared/models/examination-committee-date-data';

@Injectable()

export class ExaminationCommitteeDateDataService extends DataService<ExaminationCommitteeDateData> {
    constructor(http: HttpClient) {
        super('examinationcommitteedatedata', http);
    }
}


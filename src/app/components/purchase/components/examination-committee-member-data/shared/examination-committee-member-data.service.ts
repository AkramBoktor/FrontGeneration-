import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExaminationCommitteeMemberData } from 'app/shared/models/examination-committee-member-data';

@Injectable()

export class ExaminationCommitteeMemberDataService extends DataService<ExaminationCommitteeMemberData> {
    constructor(http: HttpClient) {
        super('examinationcommitteememberdata', http);
    }
}


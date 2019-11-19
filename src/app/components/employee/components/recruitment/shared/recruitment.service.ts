import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Recruitment } from 'app/shared/models/recruitment';

@Injectable()

export class RecruitmentService extends DataService<Recruitment> {
    constructor(http: HttpClient) {
        super('recruitment', http);
    }
}


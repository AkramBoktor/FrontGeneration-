import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ReasonForEndingEngineerHousingOnProject } from 'app/shared/models/reason-for-ending-engineer-housing-on-project';

@Injectable()

export class ReasonForEndingEngineerHousingOnProjectService extends DataService<ReasonForEndingEngineerHousingOnProject> {
    constructor(http: HttpClient) {
        super('reasonforendingengineerhousingonproject', http);
    }
}


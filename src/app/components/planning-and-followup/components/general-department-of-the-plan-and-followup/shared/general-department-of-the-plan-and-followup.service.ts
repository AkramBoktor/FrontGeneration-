import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GeneralDepartmentOfThePlanAndFollowup } from 'app/shared/models/general-department-of-the-plan-and-followup';

@Injectable()

export class GeneralDepartmentOfThePlanAndFollowupService extends DataService<GeneralDepartmentOfThePlanAndFollowup> {
    constructor(http: HttpClient) {
        super('generaldepartmentoftheplanandfollowup', http);
    }
}


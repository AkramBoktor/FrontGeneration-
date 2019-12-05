import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheSourceOfFundingForAnAnnualPlanProjectComponent } from 'app/shared/models/the-source-of-funding-for-an-annual-plan-project-component';

@Injectable()

export class TheSourceOfFundingForAnAnnualPlanProjectComponentService extends DataService<TheSourceOfFundingForAnAnnualPlanProjectComponent> {
    constructor(http: HttpClient) {
        super('thesourceoffundingforanannualplanprojectcomponent', http);
    }
}


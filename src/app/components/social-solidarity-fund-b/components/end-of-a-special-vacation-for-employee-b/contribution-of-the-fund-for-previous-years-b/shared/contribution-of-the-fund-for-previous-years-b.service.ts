import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContributionOfTheFundForPreviousYearsB } from 'app/shared/models/contribution-of-the-fund-for-previous-years-b';

@Injectable()

export class ContributionOfTheFundForPreviousYearsBService extends DataService<ContributionOfTheFundForPreviousYearsB> {
    constructor(http: HttpClient) {
        super('contributionofthefundforpreviousyearsb', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContributionOfTheFundForPreviousYearsA } from 'app/shared/models/contribution-of-the-fund-for-previous-years-a';

@Injectable()

export class ContributionOfTheFundForPreviousYearsAService extends DataService<ContributionOfTheFundForPreviousYearsA> {
    constructor(http: HttpClient) {
        super('contributionofthefundforpreviousyearsa', http);
    }
}


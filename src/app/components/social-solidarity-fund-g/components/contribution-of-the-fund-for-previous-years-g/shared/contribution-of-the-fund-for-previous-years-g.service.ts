import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContributionOfTheFundForPreviousYearsG } from 'app/shared/models/contribution-of-the-fund-for-previous-years-g';

@Injectable()

export class ContributionOfTheFundForPreviousYearsGService extends DataService<ContributionOfTheFundForPreviousYearsG> {
    constructor(http: HttpClient) {
        super('contributionofthefundforpreviousyearsg', http);
    }
}


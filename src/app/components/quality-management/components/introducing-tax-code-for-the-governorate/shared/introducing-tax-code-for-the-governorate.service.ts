import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IntroducingTaxCodeForTheGovernorate } from 'app/shared/models/introducing-tax-code-for-the-governorate';

@Injectable()

export class IntroducingTaxCodeForTheGovernorateService extends DataService<IntroducingTaxCodeForTheGovernorate> {
    constructor(http: HttpClient) {
        super('introducingtaxcodeforthegovernorate', http);
    }
}


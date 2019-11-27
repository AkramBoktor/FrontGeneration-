import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ModifyThePricesOfSchoolsForPricing2018 } from 'app/shared/models/modify-the-prices-of-schools-for-pricing-2018';

@Injectable()

export class ModifyThePricesOfSchoolsForPricing2018Service extends DataService<ModifyThePricesOfSchoolsForPricing2018> {
    constructor(http: HttpClient) {
        super('modifythepricesofschoolsforpricing2018', http);
    }
}


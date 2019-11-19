import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BusinessCostChecks } from 'app/shared/models/business-cost-checks';

@Injectable()

export class BusinessCostChecksService extends DataService<BusinessCostChecks> {
    constructor(http: HttpClient) {
        super('businesscostchecks', http);
    }
}


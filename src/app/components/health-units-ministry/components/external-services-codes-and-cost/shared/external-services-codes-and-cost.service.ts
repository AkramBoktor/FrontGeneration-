import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExternalServicesCodesAndCost } from 'app/shared/models/external-services-codes-and-cost';

@Injectable()

export class ExternalServicesCodesAndCostService extends DataService<ExternalServicesCodesAndCost> {
    constructor(http: HttpClient) {
        super('externalservicescodesandcost', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LandAllocationDecisionData } from 'app/shared/models/land-allocation-decision-data';

@Injectable()

export class LandAllocationDecisionDataService extends DataService<LandAllocationDecisionData> {
    constructor(http: HttpClient) {
        super('landallocationdecisiondata', http);
    }
}


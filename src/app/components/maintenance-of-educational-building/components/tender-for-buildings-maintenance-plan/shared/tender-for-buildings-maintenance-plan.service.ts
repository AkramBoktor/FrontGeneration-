import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TenderForBuildingsMaintenancePlan } from 'app/shared/models/tender-for-buildings-maintenance-plan';

@Injectable()

export class TenderForBuildingsMaintenancePlanService extends DataService<TenderForBuildingsMaintenancePlan> {
    constructor(http: HttpClient) {
        super('tenderforbuildingsmaintenanceplan', http);
    }
}


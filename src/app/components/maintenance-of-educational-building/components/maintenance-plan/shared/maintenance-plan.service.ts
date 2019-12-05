import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MaintenancePlan } from 'app/shared/models/maintenance-plan';

@Injectable()

export class MaintenancePlanService extends DataService<MaintenancePlan> {
    constructor(http: HttpClient) {
        super('maintenanceplan', http);
    }
}


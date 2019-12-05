import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CancelFromTheMaintenancePlan } from 'app/shared/models/cancel-from-the-maintenance-plan';

@Injectable()

export class CancelFromTheMaintenancePlanService extends DataService<CancelFromTheMaintenancePlan> {
    constructor(http: HttpClient) {
        super('cancelfromthemaintenanceplan', http);
    }
}


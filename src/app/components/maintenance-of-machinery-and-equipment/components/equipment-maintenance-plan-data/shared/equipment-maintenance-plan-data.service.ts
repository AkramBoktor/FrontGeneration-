import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EquipmentMaintenancePlanData } from 'app/shared/models/equipment-maintenance-plan-data';

@Injectable()

export class EquipmentMaintenancePlanDataService extends DataService<EquipmentMaintenancePlanData> {
    constructor(http: HttpClient) {
        super('equipmentmaintenanceplandata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PrintMaintenanceIndexationBuilding } from 'app/shared/models/print-maintenance-indexation-building';

@Injectable()

export class PrintMaintenanceIndexationBuildingService extends DataService<PrintMaintenanceIndexationBuilding> {
    constructor(http: HttpClient) {
        super('printmaintenanceindexationbuilding', http);
    }
}


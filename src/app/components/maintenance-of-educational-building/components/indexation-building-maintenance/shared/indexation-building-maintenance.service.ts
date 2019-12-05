import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IndexationBuildingMaintenance } from 'app/shared/models/indexation-building-maintenance';

@Injectable()

export class IndexationBuildingMaintenanceService extends DataService<IndexationBuildingMaintenance> {
    constructor(http: HttpClient) {
        super('indexationbuildingmaintenance', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PeriodicMaintenanceData } from 'app/shared/models/periodic-maintenance-data';

@Injectable()

export class PeriodicMaintenanceDataService extends DataService<PeriodicMaintenanceData> {
    constructor(http: HttpClient) {
        super('periodicmaintenancedata', http);
    }
}


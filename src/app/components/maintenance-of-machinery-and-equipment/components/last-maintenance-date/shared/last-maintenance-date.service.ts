import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LastMaintenanceDate } from 'app/shared/models/last-maintenance-date';

@Injectable()

export class LastMaintenanceDateService extends DataService<LastMaintenanceDate> {
    constructor(http: HttpClient) {
        super('lastmaintenancedate', http);
    }
}


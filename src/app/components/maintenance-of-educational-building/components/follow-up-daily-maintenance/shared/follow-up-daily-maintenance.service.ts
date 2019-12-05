import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FollowUpDailyMaintenance } from 'app/shared/models/follow-up-daily-maintenance';

@Injectable()

export class FollowUpDailyMaintenanceService extends DataService<FollowUpDailyMaintenance> {
    constructor(http: HttpClient) {
        super('followupdailymaintenance', http);
    }
}


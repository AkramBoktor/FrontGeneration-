import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ImplementationActivitySchedule } from 'app/shared/models/implementation-activity-schedule';

@Injectable()

export class ImplementationActivityScheduleService extends DataService<ImplementationActivitySchedule> {
    constructor(http: HttpClient) {
        super('implementationactivityschedule', http);
    }
}


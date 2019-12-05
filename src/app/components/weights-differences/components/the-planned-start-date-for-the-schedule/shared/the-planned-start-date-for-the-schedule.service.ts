import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ThePlannedStartDateForTheSchedule } from 'app/shared/models/the-planned-start-date-for-the-schedule';

@Injectable()

export class ThePlannedStartDateForTheScheduleService extends DataService<ThePlannedStartDateForTheSchedule> {
    constructor(http: HttpClient) {
        super('theplannedstartdatefortheschedule', http);
    }
}


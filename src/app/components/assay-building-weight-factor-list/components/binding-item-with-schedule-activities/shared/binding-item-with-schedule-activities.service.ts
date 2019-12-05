import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BindingItemWithScheduleActivities } from 'app/shared/models/binding-item-with-schedule-activities';

@Injectable()

export class BindingItemWithScheduleActivitiesService extends DataService<BindingItemWithScheduleActivities> {
    constructor(http: HttpClient) {
        super('bindingitemwithscheduleactivities', http);
    }
}


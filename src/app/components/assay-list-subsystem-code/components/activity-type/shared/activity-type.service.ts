import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ActivityType } from 'app/shared/models/activity-type';

@Injectable()

export class ActivityTypeService extends DataService<ActivityType> {
    constructor(http: HttpClient) {
        super('activitytype', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ScheduleAtTheBuildingLevel } from 'app/shared/models/schedule-at-the-building-level';

@Injectable()

export class ScheduleAtTheBuildingLevelService extends DataService<ScheduleAtTheBuildingLevel> {
    constructor(http: HttpClient) {
        super('scheduleatthebuildinglevel', http);
    }
}


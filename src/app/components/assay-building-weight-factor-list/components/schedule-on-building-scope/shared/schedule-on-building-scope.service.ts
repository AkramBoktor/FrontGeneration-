import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ScheduleOnBuildingScope } from 'app/shared/models/schedule-on-building-scope';

@Injectable()

export class ScheduleOnBuildingScopeService extends DataService<ScheduleOnBuildingScope> {
    constructor(http: HttpClient) {
        super('scheduleonbuildingscope', http);
    }
}


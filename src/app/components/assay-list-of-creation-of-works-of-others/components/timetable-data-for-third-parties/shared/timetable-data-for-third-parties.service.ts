import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TimetableDataForThirdParties } from 'app/shared/models/timetable-data-for-third-parties';

@Injectable()

export class TimetableDataForThirdPartiesService extends DataService<TimetableDataForThirdParties> {
    constructor(http: HttpClient) {
        super('timetabledataforthirdparties', http);
    }
}


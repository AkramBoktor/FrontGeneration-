import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TimetableDataWithdrawn } from 'app/shared/models/timetable-data-withdrawn';

@Injectable()

export class TimetableDataWithdrawnService extends DataService<TimetableDataWithdrawn> {
    constructor(http: HttpClient) {
        super('timetabledatawithdrawn', http);
    }
}


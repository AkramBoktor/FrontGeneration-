import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Timetable } from 'app/shared/models/timetable';

@Injectable()

export class TimetableService extends DataService<Timetable> {
    constructor(http: HttpClient) {
        super('timetable', http);
    }
}


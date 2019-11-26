import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ImplementationDataSchedule } from 'app/shared/models/implementation-data-schedule';

@Injectable()

export class ImplementationDataScheduleService extends DataService<ImplementationDataSchedule> {
    constructor(http: HttpClient) {
        super('implementationdataschedule', http);
    }
}


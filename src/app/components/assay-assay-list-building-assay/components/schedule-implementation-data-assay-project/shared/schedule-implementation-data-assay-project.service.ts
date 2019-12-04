import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ScheduleImplementationDataAssayProject } from 'app/shared/models/schedule-implementation-data-assay-project';

@Injectable()

export class ScheduleImplementationDataAssayProjectService extends DataService<ScheduleImplementationDataAssayProject> {
    constructor(http: HttpClient) {
        super('scheduleimplementationdataassayproject', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { WorkType } from 'app/shared/models/work-type';

@Injectable()

export class WorkTypeService extends DataService<WorkType> {
    constructor(http: HttpClient) {
        super('worktype', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SubActivityType } from 'app/shared/models/sub-activity-type';

@Injectable()

export class SubActivityTypeService extends DataService<SubActivityType> {
    constructor(http: HttpClient) {
        super('subactivitytype', http);
    }
}


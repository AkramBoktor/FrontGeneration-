import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Grievances } from 'app/shared/models/grievances';

@Injectable()

export class GrievancesService extends DataService<Grievances> {
    constructor(http: HttpClient) {
        super('grievances', http);
    }
}


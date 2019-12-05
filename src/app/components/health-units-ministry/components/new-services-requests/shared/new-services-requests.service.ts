import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NewServicesRequests } from 'app/shared/models/new-services-requests';

@Injectable()

export class NewServicesRequestsService extends DataService<NewServicesRequests> {
    constructor(http: HttpClient) {
        super('newservicesrequests', http);
    }
}


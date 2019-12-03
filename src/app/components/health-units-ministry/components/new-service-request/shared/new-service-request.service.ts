import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NewServiceRequest } from 'app/shared/models/new-service-request';

@Injectable()

export class NewServiceRequestService extends DataService<NewServiceRequest> {
    constructor(http: HttpClient) {
        super('newservicerequest', http);
    }
}


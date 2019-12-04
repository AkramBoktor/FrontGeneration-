import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RequiredServices } from 'app/shared/models/required-services';

@Injectable()

export class RequiredServicesService extends DataService<RequiredServices> {
    constructor(http: HttpClient) {
        super('requiredservices', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ServiceCodes } from 'app/shared/models/service-codes';

@Injectable()

export class ServiceCodesService extends DataService<ServiceCodes> {
    constructor(http: HttpClient) {
        super('servicecodes', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RequiredServiceses } from 'app/shared/models/required-serviceses';

@Injectable()

export class RequiredServicesesService extends DataService<RequiredServiceses> {
    constructor(http: HttpClient) {
        super('requiredserviceses', http);
    }
}


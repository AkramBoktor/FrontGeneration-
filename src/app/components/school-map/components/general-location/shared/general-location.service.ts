import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GeneralLocation } from 'app/shared/models/general-location';

@Injectable()

export class GeneralLocationService extends DataService<GeneralLocation> {
    constructor(http: HttpClient) {
        super('generallocation', http);
    }
}


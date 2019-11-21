import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PrivateCenterData } from 'app/shared/models/private-center-data';

@Injectable()

export class PrivateCenterDataService extends DataService<PrivateCenterData> {
    constructor(http: HttpClient) {
        super('privatecenterdata', http);
    }
}


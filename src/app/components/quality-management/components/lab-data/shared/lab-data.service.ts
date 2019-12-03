import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LabData } from 'app/shared/models/lab-data';

@Injectable()

export class LabDataService extends DataService<LabData> {
    constructor(http: HttpClient) {
        super('labdata', http);
    }
}


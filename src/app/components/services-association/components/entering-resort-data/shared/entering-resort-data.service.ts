import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EnteringResortData } from 'app/shared/models/entering-resort-data';

@Injectable()

export class EnteringResortDataService extends DataService<EnteringResortData> {
    constructor(http: HttpClient) {
        super('enteringresortdata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TemporarySeizureData } from 'app/shared/models/temporary-seizure-data';

@Injectable()

export class TemporarySeizureDataService extends DataService<TemporarySeizureData> {
    constructor(http: HttpClient) {
        super('temporaryseizuredata', http);
    }
}


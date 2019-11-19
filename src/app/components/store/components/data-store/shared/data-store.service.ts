import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataStore } from 'app/shared/models/data-store';

@Injectable()

export class DataStoreService extends DataService<DataStore> {
    constructor(http: HttpClient) {
        super('datastore', http);
    }
}


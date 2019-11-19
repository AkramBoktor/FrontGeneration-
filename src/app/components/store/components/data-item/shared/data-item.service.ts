import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataItem } from 'app/shared/models/data-item';

@Injectable()

export class DataItemService extends DataService<DataItem> {
    constructor(http: HttpClient) {
        super('dataitem', http);
    }
}


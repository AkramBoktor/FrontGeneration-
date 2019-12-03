import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataElementOfBasicItem } from 'app/shared/models/data-element-of-basic-item';

@Injectable()

export class DataElementOfBasicItemService extends DataService<DataElementOfBasicItem> {
    constructor(http: HttpClient) {
        super('dataelementofbasicitem', http);
    }
}


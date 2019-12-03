import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayData } from 'app/shared/models/assay-data';

@Injectable()

export class AssayDataService extends DataService<AssayData> {
    constructor(http: HttpClient) {
        super('assaydata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayItem } from 'app/shared/models/assay-item';

@Injectable()

export class AssayItemService extends DataService<AssayItem> {
    constructor(http: HttpClient) {
        super('assayitem', http);
    }
}


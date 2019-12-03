import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayLists } from 'app/shared/models/assay-lists';

@Injectable()

export class AssayListsService extends DataService<AssayLists> {
    constructor(http: HttpClient) {
        super('assaylists', http);
    }
}


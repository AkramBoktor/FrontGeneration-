import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalAssayLists } from 'app/shared/models/typical-assay-lists';

@Injectable()

export class TypicalAssayListsService extends DataService<TypicalAssayLists> {
    constructor(http: HttpClient) {
        super('typicalassaylists', http);
    }
}


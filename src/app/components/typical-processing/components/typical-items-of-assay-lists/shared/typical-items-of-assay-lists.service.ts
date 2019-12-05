import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalItemsOfAssayLists } from 'app/shared/models/typical-items-of-assay-lists';

@Injectable()

export class TypicalItemsOfAssayListsService extends DataService<TypicalItemsOfAssayLists> {
    constructor(http: HttpClient) {
        super('typicalitemsofassaylists', http);
    }
}


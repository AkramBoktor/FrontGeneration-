import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ItemsOfAssayLists } from 'app/shared/models/items-of-assay-lists';

@Injectable()

export class ItemsOfAssayListsService extends DataService<ItemsOfAssayLists> {
    constructor(http: HttpClient) {
        super('itemsofassaylists', http);
    }
}


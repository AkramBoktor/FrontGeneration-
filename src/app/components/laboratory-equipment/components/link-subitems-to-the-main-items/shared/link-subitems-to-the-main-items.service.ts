import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LinkSubitemsToTheMainItems } from 'app/shared/models/link-subitems-to-the-main-items';

@Injectable()

export class LinkSubitemsToTheMainItemsService extends DataService<LinkSubitemsToTheMainItems> {
    constructor(http: HttpClient) {
        super('linksubitemstothemainitems', http);
    }
}


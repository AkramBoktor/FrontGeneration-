import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LinkItemsToObjectCodes } from 'app/shared/models/link-items-to-object-codes';

@Injectable()

export class LinkItemsToObjectCodesService extends DataService<LinkItemsToObjectCodes> {
    constructor(http: HttpClient) {
        super('linkitemstoobjectcodes', http);
    }
}


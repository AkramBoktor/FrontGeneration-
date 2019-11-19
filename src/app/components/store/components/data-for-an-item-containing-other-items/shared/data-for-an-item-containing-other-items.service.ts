import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataForAnItemContainingOtherItems } from 'app/shared/models/data-for-an-item-containing-other-items';

@Injectable()

export class DataForAnItemContainingOtherItemsService extends DataService<DataForAnItemContainingOtherItems> {
    constructor(http: HttpClient) {
        super('dataforanitemcontainingotheritems', http);
    }
}


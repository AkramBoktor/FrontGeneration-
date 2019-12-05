import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PriceForNewItem } from 'app/shared/models/price-for-new-item';

@Injectable()

export class PriceForNewItemService extends DataService<PriceForNewItem> {
    constructor(http: HttpClient) {
        super('pricefornewitem', http);
    }
}


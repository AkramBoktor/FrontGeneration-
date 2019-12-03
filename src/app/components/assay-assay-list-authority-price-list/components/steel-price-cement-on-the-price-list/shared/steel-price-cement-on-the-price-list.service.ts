import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SteelPriceCementOnThePriceList } from 'app/shared/models/steel-price-cement-on-the-price-list';

@Injectable()

export class SteelPriceCementOnThePriceListService extends DataService<SteelPriceCementOnThePriceList> {
    constructor(http: HttpClient) {
        super('steelpricecementonthepricelist', http);
    }
}


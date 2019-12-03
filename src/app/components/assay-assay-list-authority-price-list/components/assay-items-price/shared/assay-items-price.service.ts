import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayItemsPrice } from 'app/shared/models/assay-items-price';

@Injectable()

export class AssayItemsPriceService extends DataService<AssayItemsPrice> {
    constructor(http: HttpClient) {
        super('assayitemsprice', http);
    }
}


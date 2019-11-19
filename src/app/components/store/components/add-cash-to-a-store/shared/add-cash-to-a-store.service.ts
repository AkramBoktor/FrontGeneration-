import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddCashToAStore } from 'app/shared/models/add-cash-to-a-store';

@Injectable()

export class AddCashToAStoreService extends DataService<AddCashToAStore> {
    constructor(http: HttpClient) {
        super('addcashtoastore', http);
    }
}


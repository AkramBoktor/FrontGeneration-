import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SalesForms } from 'app/shared/models/sales-forms';

@Injectable()

export class SalesFormsService extends DataService<SalesForms> {
    constructor(http: HttpClient) {
        super('salesforms', http);
    }
}


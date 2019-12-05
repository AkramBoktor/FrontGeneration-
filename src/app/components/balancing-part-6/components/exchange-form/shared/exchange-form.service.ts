import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExchangeForm } from 'app/shared/models/exchange-form';

@Injectable()

export class ExchangeFormService extends DataService<ExchangeForm> {
    constructor(http: HttpClient) {
        super('exchangeform', http);
    }
}


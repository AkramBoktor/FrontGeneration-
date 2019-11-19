import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Invoice50 } from 'app/shared/models/invoice-50';

@Injectable()

export class Invoice50Service extends DataService<Invoice50> {
    constructor(http: HttpClient) {
        super('invoice50', http);
    }
}


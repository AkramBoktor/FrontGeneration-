import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Supply } from 'app/shared/models/supply';

@Injectable()

export class SupplyService extends DataService<Supply> {
    constructor(http: HttpClient) {
        super('supply', http);
    }
}


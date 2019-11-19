import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Promotion } from 'app/shared/models/promotion';

@Injectable()

export class PromotionService extends DataService<Promotion> {
    constructor(http: HttpClient) {
        super('promotion', http);
    }
}


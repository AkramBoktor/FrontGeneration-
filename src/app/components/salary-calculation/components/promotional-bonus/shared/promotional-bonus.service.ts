import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PromotionalBonus } from 'app/shared/models/promotional-bonus';

@Injectable()

export class PromotionalBonusService extends DataService<PromotionalBonus> {
    constructor(http: HttpClient) {
        super('promotionalbonus', http);
    }
}


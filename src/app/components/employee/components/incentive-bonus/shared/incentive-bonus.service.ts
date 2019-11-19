import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IncentiveBonus } from 'app/shared/models/incentive-bonus';

@Injectable()

export class IncentiveBonusService extends DataService<IncentiveBonus> {
    constructor(http: HttpClient) {
        super('incentivebonus', http);
    }
}


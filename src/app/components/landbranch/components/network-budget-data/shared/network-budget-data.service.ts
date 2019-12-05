import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NetworkBudgetData } from 'app/shared/models/network-budget-data';

@Injectable()

export class NetworkBudgetDataService extends DataService<NetworkBudgetData> {
    constructor(http: HttpClient) {
        super('networkbudgetdata', http);
    }
}


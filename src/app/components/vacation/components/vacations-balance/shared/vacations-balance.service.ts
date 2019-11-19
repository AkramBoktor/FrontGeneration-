import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { VacationsBalance } from 'app/shared/models/vacations-balance';

@Injectable()

export class VacationsBalanceService extends DataService<VacationsBalance> {
    constructor(http: HttpClient) {
        super('vacationsbalance', http);
    }
}


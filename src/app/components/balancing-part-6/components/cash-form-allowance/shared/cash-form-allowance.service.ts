import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CashFormAllowance } from 'app/shared/models/cash-form-allowance';

@Injectable()

export class CashFormAllowanceService extends DataService<CashFormAllowance> {
    constructor(http: HttpClient) {
        super('cashformallowance', http);
    }
}


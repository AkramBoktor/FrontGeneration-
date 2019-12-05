import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InsertNewExpensesForRegionalFinancialPortfolios } from 'app/shared/models/insert-new-expenses-for-regional-financial-portfolios';

@Injectable()

export class InsertNewExpensesForRegionalFinancialPortfoliosService extends DataService<InsertNewExpensesForRegionalFinancialPortfolios> {
    constructor(http: HttpClient) {
        super('insertnewexpensesforregionalfinancialportfolios', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FinancialDisclosureStatement } from 'app/shared/models/financial-disclosure-statement';

@Injectable()

export class FinancialDisclosureStatementService extends DataService<FinancialDisclosureStatement> {
    constructor(http: HttpClient) {
        super('financialdisclosurestatement', http);
    }
}


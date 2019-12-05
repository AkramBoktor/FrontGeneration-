import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BankSalary } from 'app/shared/models/bank-salary';

@Injectable()

export class BankSalaryService extends DataService<BankSalary> {
    constructor(http: HttpClient) {
        super('banksalary', http);
    }
}


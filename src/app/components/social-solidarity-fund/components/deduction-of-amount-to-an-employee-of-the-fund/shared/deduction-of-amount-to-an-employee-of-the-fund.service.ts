import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DeductionOfAmountToAnEmployeeOfTheFund } from 'app/shared/models/deduction-of-amount-to-an-employee-of-the-fund';

@Injectable()

export class DeductionOfAmountToAnEmployeeOfTheFundService extends DataService<DeductionOfAmountToAnEmployeeOfTheFund> {
    constructor(http: HttpClient) {
        super('deductionofamounttoanemployeeofthefund', http);
    }
}


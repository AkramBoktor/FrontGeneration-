import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DeductionOfAnAmountToAnEmployeeOfTheFundA } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-a';

@Injectable()

export class DeductionOfAnAmountToAnEmployeeOfTheFundAService extends DataService<DeductionOfAnAmountToAnEmployeeOfTheFundA> {
    constructor(http: HttpClient) {
        super('deductionofanamounttoanemployeeofthefunda', http);
    }
}


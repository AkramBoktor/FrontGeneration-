import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DeductionOfAnAmountToAnEmployeeOfTheFundG } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-g';

@Injectable()

export class DeductionOfAnAmountToAnEmployeeOfTheFundGService extends DataService<DeductionOfAnAmountToAnEmployeeOfTheFundG> {
    constructor(http: HttpClient) {
        super('deductionofanamounttoanemployeeofthefundg', http);
    }
}


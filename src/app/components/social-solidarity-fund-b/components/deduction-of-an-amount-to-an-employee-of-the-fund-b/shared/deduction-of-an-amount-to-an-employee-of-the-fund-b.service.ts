import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DeductionOfAnAmountToAnEmployeeOfTheFundB } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-b';

@Injectable()

export class DeductionOfAnAmountToAnEmployeeOfTheFundBService extends DataService<DeductionOfAnAmountToAnEmployeeOfTheFundB> {
    constructor(http: HttpClient) {
        super('deductionofanamounttoanemployeeofthefundb', http);
    }
}


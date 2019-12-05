import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EnteringWithdrawalAndDepositAmounts } from 'app/shared/models/entering-withdrawal-and-deposit-amounts';

@Injectable()

export class EnteringWithdrawalAndDepositAmountsService extends DataService<EnteringWithdrawalAndDepositAmounts> {
    constructor(http: HttpClient) {
        super('enteringwithdrawalanddepositamounts', http);
    }
}


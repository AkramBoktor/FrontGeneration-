import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TransferHisCustodyEmployeeToAnother } from 'app/shared/models/transfer-his-custody-employee-to-another';

@Injectable()

export class TransferHisCustodyEmployeeToAnotherService extends DataService<TransferHisCustodyEmployeeToAnother> {
    constructor(http: HttpClient) {
        super('transferhiscustodyemployeetoanother', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TransferContractedEmployee } from 'app/shared/models/transfer-contracted-employee';

@Injectable()

export class TransferContractedEmployeeService extends DataService<TransferContractedEmployee> {
    constructor(http: HttpClient) {
        super('transfercontractedemployee', http);
    }
}


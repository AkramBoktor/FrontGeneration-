import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ReturnOfCustodyOfAnEmployee } from 'app/shared/models/return-of-custody-of-an-employee';

@Injectable()

export class ReturnOfCustodyOfAnEmployeeService extends DataService<ReturnOfCustodyOfAnEmployee> {
    constructor(http: HttpClient) {
        super('returnofcustodyofanemployee', http);
    }
}


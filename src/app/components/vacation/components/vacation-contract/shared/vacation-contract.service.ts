import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { VacationContract } from 'app/shared/models/vacation-contract';

@Injectable()

export class VacationContractService extends DataService<VacationContract> {
    constructor(http: HttpClient) {
        super('vacationcontract', http);
    }
}


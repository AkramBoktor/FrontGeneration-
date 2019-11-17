import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractTermination } from 'app/shared/models/contract-termination';

@Injectable()

export class ContractTerminationService extends DataService<ContractTermination> {
    constructor(http: HttpClient) {
        super('contracttermination', http);
    }
}


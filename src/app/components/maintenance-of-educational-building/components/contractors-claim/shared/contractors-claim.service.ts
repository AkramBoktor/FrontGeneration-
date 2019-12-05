import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractorsClaim } from 'app/shared/models/contractors-claim';

@Injectable()

export class ContractorsClaimService extends DataService<ContractorsClaim> {
    constructor(http: HttpClient) {
        super('contractorsclaim', http);
    }
}


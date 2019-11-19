import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractorData } from 'app/shared/models/contractor-data';

@Injectable()

export class ContractorDataService extends DataService<ContractorData> {
    constructor(http: HttpClient) {
        super('contractordata', http);
    }
}


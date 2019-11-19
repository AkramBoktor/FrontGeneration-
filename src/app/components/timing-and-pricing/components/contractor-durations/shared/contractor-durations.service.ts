import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractorDurations } from 'app/shared/models/contractor-durations';

@Injectable()

export class ContractorDurationsService extends DataService<ContractorDurations> {
    constructor(http: HttpClient) {
        super('contractordurations', http);
    }
}


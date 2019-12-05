import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractorDataQualityManagement } from 'app/shared/models/contractor-data-quality-management';

@Injectable()

export class ContractorDataQualityManagementService extends DataService<ContractorDataQualityManagement> {
    constructor(http: HttpClient) {
        super('contractordataqualitymanagement', http);
    }
}


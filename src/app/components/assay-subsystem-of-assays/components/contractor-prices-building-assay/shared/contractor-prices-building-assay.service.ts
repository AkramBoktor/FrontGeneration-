import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ContractorPricesBuildingAssay } from 'app/shared/models/contractor-prices-building-assay';

@Injectable()

export class ContractorPricesBuildingAssayService extends DataService<ContractorPricesBuildingAssay> {
    constructor(http: HttpClient) {
        super('contractorpricesbuildingassay', http);
    }
}


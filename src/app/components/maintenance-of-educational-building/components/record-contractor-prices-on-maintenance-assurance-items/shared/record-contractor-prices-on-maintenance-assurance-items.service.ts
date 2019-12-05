import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordContractorPricesOnMaintenanceAssuranceItems } from 'app/shared/models/record-contractor-prices-on-maintenance-assurance-items';

@Injectable()

export class RecordContractorPricesOnMaintenanceAssuranceItemsService extends DataService<RecordContractorPricesOnMaintenanceAssuranceItems> {
    constructor(http: HttpClient) {
        super('recordcontractorpricesonmaintenanceassuranceitems', http);
    }
}


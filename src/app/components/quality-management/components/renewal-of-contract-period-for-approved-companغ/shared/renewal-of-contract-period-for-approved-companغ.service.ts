import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RenewalOfContractPeriodForApprovedCompanغ } from 'app/shared/models/renewal-of-contract-period-for-approved-companغ';

@Injectable()

export class RenewalOfContractPeriodForApprovedCompanغService extends DataService<RenewalOfContractPeriodForApprovedCompanغ> {
    constructor(http: HttpClient) {
        super('renewalofcontractperiodforapprovedcompanغ', http);
    }
}


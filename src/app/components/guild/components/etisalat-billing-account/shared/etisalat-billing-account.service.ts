import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EtisalatBillingAccount } from 'app/shared/models/etisalat-billing-account';

@Injectable()

export class EtisalatBillingAccountService extends DataService<EtisalatBillingAccount> {
    constructor(http: HttpClient) {
        super('etisalatbillingaccount', http);
    }
}


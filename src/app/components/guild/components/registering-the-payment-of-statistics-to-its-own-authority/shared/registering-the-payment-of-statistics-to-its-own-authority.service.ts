import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthority } from 'app/shared/models/registering-the-payment-of-statistics-to-its-own-authority';

@Injectable()

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityService extends DataService<RegisteringThePaymentOfStatisticsToItsOwnAuthority> {
    constructor(http: HttpClient) {
        super('registeringthepaymentofstatisticstoitsownauthority', http);
    }
}


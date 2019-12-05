import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ElectronicPaymentForm } from 'app/shared/models/electronic-payment-form';

@Injectable()

export class ElectronicPaymentFormService extends DataService<ElectronicPaymentForm> {
    constructor(http: HttpClient) {
        super('electronicpaymentform', http);
    }
}


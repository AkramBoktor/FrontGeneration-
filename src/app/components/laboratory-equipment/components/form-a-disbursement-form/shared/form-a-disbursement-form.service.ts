import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FormADisbursementForm } from 'app/shared/models/form-a-disbursement-form';

@Injectable()

export class FormADisbursementFormService extends DataService<FormADisbursementForm> {
    constructor(http: HttpClient) {
        super('formadisbursementform', http);
    }
}


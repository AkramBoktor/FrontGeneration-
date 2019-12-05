import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalFormADisbursementForm } from 'app/shared/models/typical-form-a-disbursement-form';

@Injectable()

export class TypicalFormADisbursementFormService extends DataService<TypicalFormADisbursementForm> {
    constructor(http: HttpClient) {
        super('typicalformadisbursementform', http);
    }
}


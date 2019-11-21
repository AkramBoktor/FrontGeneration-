import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EnterTheTelephoneBill } from 'app/shared/models/enter-the-telephone-bill';

@Injectable()

export class EnterTheTelephoneBillService extends DataService<EnterTheTelephoneBill> {
    constructor(http: HttpClient) {
        super('enterthetelephonebill', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CanceledTender } from 'app/shared/models/canceled-tender';

@Injectable()

export class CanceledTenderService extends DataService<CanceledTender> {
    constructor(http: HttpClient) {
        super('canceledtender', http);
    }
}


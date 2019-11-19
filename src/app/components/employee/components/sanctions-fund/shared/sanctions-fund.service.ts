import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SanctionsFund } from 'app/shared/models/sanctions-fund';

@Injectable()

export class SanctionsFundService extends DataService<SanctionsFund> {
    constructor(http: HttpClient) {
        super('sanctionsfund', http);
    }
}


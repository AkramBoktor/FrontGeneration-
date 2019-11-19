import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ChairmanVisa } from 'app/shared/models/chairman-visa';

@Injectable()

export class ChairmanVisaService extends DataService<ChairmanVisa> {
    constructor(http: HttpClient) {
        super('chairmanvisa', http);
    }
}


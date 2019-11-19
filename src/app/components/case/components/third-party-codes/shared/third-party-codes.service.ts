import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ThirdPartyCodes } from 'app/shared/models/third-party-codes';

@Injectable()

export class ThirdPartyCodesService extends DataService<ThirdPartyCodes> {
    constructor(http: HttpClient) {
        super('thirdpartycodes', http);
    }
}


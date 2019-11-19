import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { SessionSubCodes } from 'app/shared/models/session-sub-codes';

@Injectable()

export class SessionSubCodesService extends DataService<SessionSubCodes> {
    constructor(http: HttpClient) {
        super('sessionsubcodes', http);
    }
}


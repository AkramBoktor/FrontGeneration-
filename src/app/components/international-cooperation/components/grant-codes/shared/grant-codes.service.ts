import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GrantCodes } from 'app/shared/models/grant-codes';

@Injectable()

export class GrantCodesService extends DataService<GrantCodes> {
    constructor(http: HttpClient) {
        super('grantcodes', http);
    }
}


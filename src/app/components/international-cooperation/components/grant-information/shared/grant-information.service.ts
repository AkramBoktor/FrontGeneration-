import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GrantInformation } from 'app/shared/models/grant-information';

@Injectable()

export class GrantInformationService extends DataService<GrantInformation> {
    constructor(http: HttpClient) {
        super('grantinformation', http);
    }
}


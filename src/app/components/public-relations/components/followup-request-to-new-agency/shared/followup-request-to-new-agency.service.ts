import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FollowupRequestToNewAgency } from 'app/shared/models/followup-request-to-new-agency';

@Injectable()

export class FollowupRequestToNewAgencyService extends DataService<FollowupRequestToNewAgency> {
    constructor(http: HttpClient) {
        super('followuprequesttonewagency', http);
    }
}


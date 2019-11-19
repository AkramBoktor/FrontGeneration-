import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LawsuitSessionsArbitration } from 'app/shared/models/lawsuit-sessions-arbitration';

@Injectable()

export class LawsuitSessionsArbitrationService extends DataService<LawsuitSessionsArbitration> {
    constructor(http: HttpClient) {
        super('lawsuitsessionsarbitration', http);
    }
}


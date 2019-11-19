import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExternalInvestigations } from 'app/shared/models/external-investigations';

@Injectable()

export class ExternalInvestigationsService extends DataService<ExternalInvestigations> {
    constructor(http: HttpClient) {
        super('externalinvestigations', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InternalInvestigations } from 'app/shared/models/internal-investigations';

@Injectable()

export class InternalInvestigationsService extends DataService<InternalInvestigations> {
    constructor(http: HttpClient) {
        super('internalinvestigations', http);
    }
}


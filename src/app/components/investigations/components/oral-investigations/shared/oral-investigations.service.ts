import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { OralInvestigations } from 'app/shared/models/oral-investigations';

@Injectable()

export class OralInvestigationsService extends DataService<OralInvestigations> {
    constructor(http: HttpClient) {
        super('oralinvestigations', http);
    }
}


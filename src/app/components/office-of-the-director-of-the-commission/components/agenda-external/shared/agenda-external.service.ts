import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AgendaExternal } from 'app/shared/models/agenda-external';

@Injectable()

export class AgendaExternalService extends DataService<AgendaExternal> {
    constructor(http: HttpClient) {
        super('agendaexternal', http);
    }
}


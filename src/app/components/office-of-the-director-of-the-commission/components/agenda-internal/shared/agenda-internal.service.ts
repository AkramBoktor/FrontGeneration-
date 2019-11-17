import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AgendaInternal } from 'app/shared/models/agenda-internal';

@Injectable()

export class AgendaInternalService extends DataService<AgendaInternal> {
    constructor(http: HttpClient) {
        super('agendainternal', http);
    }
}


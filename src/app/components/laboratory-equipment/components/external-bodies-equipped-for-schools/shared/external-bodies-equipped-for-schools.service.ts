import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExternalBodiesEquippedForSchools } from 'app/shared/models/external-bodies-equipped-for-schools';

@Injectable()

export class ExternalBodiesEquippedForSchoolsService extends DataService<ExternalBodiesEquippedForSchools> {
    constructor(http: HttpClient) {
        super('externalbodiesequippedforschools', http);
    }
}


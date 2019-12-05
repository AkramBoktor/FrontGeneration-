import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TypicalExternalBodyEquippedForSchools } from 'app/shared/models/typical-external-body-equipped-for-schools';

@Injectable()

export class TypicalExternalBodyEquippedForSchoolsService extends DataService<TypicalExternalBodyEquippedForSchools> {
    constructor(http: HttpClient) {
        super('typicalexternalbodyequippedforschools', http);
    }
}


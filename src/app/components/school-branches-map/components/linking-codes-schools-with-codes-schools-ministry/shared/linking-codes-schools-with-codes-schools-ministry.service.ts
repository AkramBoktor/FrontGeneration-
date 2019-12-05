import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LinkingCodesSchoolsWithCodesSchoolsMinistry } from 'app/shared/models/linking-codes-schools-with-codes-schools-ministry';

@Injectable()

export class LinkingCodesSchoolsWithCodesSchoolsMinistryService extends DataService<LinkingCodesSchoolsWithCodesSchoolsMinistry> {
    constructor(http: HttpClient) {
        super('linkingcodesschoolswithcodesschoolsministry', http);
    }
}


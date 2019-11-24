import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GeneralSite } from 'app/shared/models/general-site';

@Injectable()

export class GeneralSiteService extends DataService<GeneralSite> {
    constructor(http: HttpClient) {
        super('generalsite', http);
    }
}


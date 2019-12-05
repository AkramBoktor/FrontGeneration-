import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PublicSiteBoundaryData } from 'app/shared/models/public-site-boundary-data';

@Injectable()

export class PublicSiteBoundaryDataService extends DataService<PublicSiteBoundaryData> {
    constructor(http: HttpClient) {
        super('publicsiteboundarydata', http);
    }
}


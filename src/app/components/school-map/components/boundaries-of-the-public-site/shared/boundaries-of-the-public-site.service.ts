import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BoundariesOfThePublicSite } from 'app/shared/models/boundaries-of-the-public-site';

@Injectable()

export class BoundariesOfThePublicSiteService extends DataService<BoundariesOfThePublicSite> {
    constructor(http: HttpClient) {
        super('boundariesofthepublicsite', http);
    }
}


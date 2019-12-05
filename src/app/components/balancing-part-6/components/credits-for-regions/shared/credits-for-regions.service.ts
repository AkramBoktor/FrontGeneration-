import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CreditsForRegions } from 'app/shared/models/credits-for-regions';

@Injectable()

export class CreditsForRegionsService extends DataService<CreditsForRegions> {
    constructor(http: HttpClient) {
        super('creditsforregions', http);
    }
}


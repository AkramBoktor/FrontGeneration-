import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InfluentialOcean } from 'app/shared/models/influential-ocean';

@Injectable()

export class InfluentialOceanService extends DataService<InfluentialOcean> {
    constructor(http: HttpClient) {
        super('influentialocean', http);
    }
}


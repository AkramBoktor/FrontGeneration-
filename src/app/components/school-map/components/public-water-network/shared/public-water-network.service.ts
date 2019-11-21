import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PublicWaterNetwork } from 'app/shared/models/public-water-network';

@Injectable()

export class PublicWaterNetworkService extends DataService<PublicWaterNetwork> {
    constructor(http: HttpClient) {
        super('publicwaternetwork', http);
    }
}


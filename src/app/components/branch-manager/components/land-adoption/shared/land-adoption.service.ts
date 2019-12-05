import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LandAdoption } from 'app/shared/models/land-adoption';

@Injectable()

export class LandAdoptionService extends DataService<LandAdoption> {
    constructor(http: HttpClient) {
        super('landadoption', http);
    }
}


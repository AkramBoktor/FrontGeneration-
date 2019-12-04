import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { WeightsFactor } from 'app/shared/models/weights-factor';

@Injectable()

export class WeightsFactorService extends DataService<WeightsFactor> {
    constructor(http: HttpClient) {
        super('weightsfactor', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayItemsDueToWeightsFactor } from 'app/shared/models/assay-items-due-to-weights-factor';

@Injectable()

export class AssayItemsDueToWeightsFactorService extends DataService<AssayItemsDueToWeightsFactor> {
    constructor(http: HttpClient) {
        super('assayitemsduetoweightsfactor', http);
    }
}


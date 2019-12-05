import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssayWeightsFactorItems } from 'app/shared/models/assay-weights-factor-items';

@Injectable()

export class AssayWeightsFactorItemsService extends DataService<AssayWeightsFactorItems> {
    constructor(http: HttpClient) {
        super('assayweightsfactoritems', http);
    }
}


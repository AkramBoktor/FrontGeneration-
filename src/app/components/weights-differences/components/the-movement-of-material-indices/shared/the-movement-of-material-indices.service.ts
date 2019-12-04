import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheMovementOfMaterialIndices } from 'app/shared/models/the-movement-of-material-indices';

@Injectable()

export class TheMovementOfMaterialIndicesService extends DataService<TheMovementOfMaterialIndices> {
    constructor(http: HttpClient) {
        super('themovementofmaterialindices', http);
    }
}


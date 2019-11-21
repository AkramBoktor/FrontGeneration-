import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddAssayDataAccordingToArithmeticCoefficient } from 'app/shared/models/add-assay-data-according-to-arithmetic-coefficient';

@Injectable()

export class AddAssayDataAccordingToArithmeticCoefficientService extends DataService<AddAssayDataAccordingToArithmeticCoefficient> {
    constructor(http: HttpClient) {
        super('addassaydataaccordingtoarithmeticcoefficient', http);
    }
}


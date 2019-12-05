import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataUnitOfMeasurement } from 'app/shared/models/data-unit-of-measurement';

@Injectable()

export class DataUnitOfMeasurementService extends DataService<DataUnitOfMeasurement> {
    constructor(http: HttpClient) {
        super('dataunitofmeasurement', http);
    }
}


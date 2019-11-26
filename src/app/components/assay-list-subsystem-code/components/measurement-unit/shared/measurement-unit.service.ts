import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MeasurementUnit } from 'app/shared/models/measurement-unit';

@Injectable()

export class MeasurementUnitService extends DataService<MeasurementUnit> {
    constructor(http: HttpClient) {
        super('measurementunit', http);
    }
}


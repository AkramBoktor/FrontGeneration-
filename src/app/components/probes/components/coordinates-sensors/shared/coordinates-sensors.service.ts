import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CoordinatesSensors } from 'app/shared/models/coordinates-sensors';

@Injectable()

export class CoordinatesSensorsService extends DataService<CoordinatesSensors> {
    constructor(http: HttpClient) {
        super('coordinatessensors', http);
    }
}


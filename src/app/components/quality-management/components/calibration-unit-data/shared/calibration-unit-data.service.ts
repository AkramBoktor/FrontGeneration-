import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CalibrationUnitData } from 'app/shared/models/calibration-unit-data';

@Injectable()

export class CalibrationUnitDataService extends DataService<CalibrationUnitData> {
    constructor(http: HttpClient) {
        super('calibrationunitdata', http);
    }
}


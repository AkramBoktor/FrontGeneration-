import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { StatementsOfSensors } from 'app/shared/models/statements-of-sensors';

@Injectable()

export class StatementsOfSensorsService extends DataService<StatementsOfSensors> {
    constructor(http: HttpClient) {
        super('statementsofsensors', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { HealthUnitData } from 'app/shared/models/health-unit-data';

@Injectable()

export class HealthUnitDataService extends DataService<HealthUnitData> {
    constructor(http: HttpClient) {
        super('healthunitdata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MinistryUnitData } from 'app/shared/models/ministry-unit-data';

@Injectable()

export class MinistryUnitDataService extends DataService<MinistryUnitData> {
    constructor(http: HttpClient) {
        super('ministryunitdata', http);
    }
}


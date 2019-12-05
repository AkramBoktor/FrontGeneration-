import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BuildingData } from 'app/shared/models/building-data';

@Injectable()

export class BuildingDataService extends DataService<BuildingData> {
    constructor(http: HttpClient) {
        super('buildingdata', http);
    }
}


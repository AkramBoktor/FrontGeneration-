import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PositionOfLeasedBuildings } from 'app/shared/models/position-of-leased-buildings';

@Injectable()

export class PositionOfLeasedBuildingsService extends DataService<PositionOfLeasedBuildings> {
    constructor(http: HttpClient) {
        super('positionofleasedbuildings', http);
    }
}


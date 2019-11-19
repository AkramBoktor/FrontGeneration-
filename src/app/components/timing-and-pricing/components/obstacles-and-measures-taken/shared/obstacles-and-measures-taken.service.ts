import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ObstaclesAndMeasuresTaken } from 'app/shared/models/obstacles-and-measures-taken';

@Injectable()

export class ObstaclesAndMeasuresTakenService extends DataService<ObstaclesAndMeasuresTaken> {
    constructor(http: HttpClient) {
        super('obstaclesandmeasurestaken', http);
    }
}


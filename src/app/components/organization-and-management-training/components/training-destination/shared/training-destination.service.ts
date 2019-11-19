import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TrainingDestination } from 'app/shared/models/training-destination';

@Injectable()

export class TrainingDestinationService extends DataService<TrainingDestination> {
    constructor(http: HttpClient) {
        super('trainingdestination', http);
    }
}


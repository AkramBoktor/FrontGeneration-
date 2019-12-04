import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AvailableLandPosition } from 'app/shared/models/available-land-position';

@Injectable()

export class AvailableLandPositionService extends DataService<AvailableLandPosition> {
    constructor(http: HttpClient) {
        super('availablelandposition', http);
    }
}


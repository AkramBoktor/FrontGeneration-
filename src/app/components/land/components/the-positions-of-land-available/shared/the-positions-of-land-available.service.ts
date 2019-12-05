import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ThePositionsOfLandAvailable } from 'app/shared/models/the-positions-of-land-available';

@Injectable()

export class ThePositionsOfLandAvailableService extends DataService<ThePositionsOfLandAvailable> {
    constructor(http: HttpClient) {
        super('thepositionsoflandavailable', http);
    }
}


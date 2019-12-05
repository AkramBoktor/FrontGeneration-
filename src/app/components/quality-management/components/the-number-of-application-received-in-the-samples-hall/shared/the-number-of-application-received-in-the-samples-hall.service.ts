import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TheNumberOfApplicationReceivedInTheSamplesHall } from 'app/shared/models/the-number-of-application-received-in-the-samples-hall';

@Injectable()

export class TheNumberOfApplicationReceivedInTheSamplesHallService extends DataService<TheNumberOfApplicationReceivedInTheSamplesHall> {
    constructor(http: HttpClient) {
        super('thenumberofapplicationreceivedinthesampleshall', http);
    }
}


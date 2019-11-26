import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EndingPlacementOfExecutiveEngineer } from 'app/shared/models/ending-placement-of-executive-engineer';

@Injectable()

export class EndingPlacementOfExecutiveEngineerService extends DataService<EndingPlacementOfExecutiveEngineer> {
    constructor(http: HttpClient) {
        super('endingplacementofexecutiveengineer', http);
    }
}


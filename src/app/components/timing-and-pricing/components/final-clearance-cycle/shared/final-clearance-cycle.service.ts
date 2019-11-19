import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FinalClearanceCycle } from 'app/shared/models/final-clearance-cycle';

@Injectable()

export class FinalClearanceCycleService extends DataService<FinalClearanceCycle> {
    constructor(http: HttpClient) {
        super('finalclearancecycle', http);
    }
}


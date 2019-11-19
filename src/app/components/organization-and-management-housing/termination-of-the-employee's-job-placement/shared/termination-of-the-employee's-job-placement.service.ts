import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TerminationOfTheEmployee'sJobPlacement } from 'app/shared/models/termination-of-the-employee's-job-placement';

@Injectable()

export class TerminationOfTheEmployee'sJobPlacementService extends DataService<TerminationOfTheEmployee'sJobPlacement> {
    constructor(http: HttpClient) {
        super('terminationoftheemployee'sjobplacement', http);
    }
}


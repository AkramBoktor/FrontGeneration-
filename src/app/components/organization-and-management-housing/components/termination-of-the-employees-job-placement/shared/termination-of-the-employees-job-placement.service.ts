import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TerminationOfTheEmployeesJobPlacement } from 'app/shared/models/termination-of-the-employees-job-placement';

@Injectable()

export class TerminationOfTheEmployeesJobPlacementService extends DataService<TerminationOfTheEmployeesJobPlacement> {
    constructor(http: HttpClient) {
        super('terminationoftheemployeesjobplacement', http);
    }
}


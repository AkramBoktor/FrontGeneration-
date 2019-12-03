import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundA } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-a';

@Injectable()

export class TerminationOfTheParticipationOfAnEmployeeInTheFundAService extends DataService<TerminationOfTheParticipationOfAnEmployeeInTheFundA> {
    constructor(http: HttpClient) {
        super('terminationoftheparticipationofanemployeeinthefunda', http);
    }
}


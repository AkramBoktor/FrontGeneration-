import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundG } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-g';

@Injectable()

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGService extends DataService<TerminationOfTheParticipationOfAnEmployeeInTheFundG> {
    constructor(http: HttpClient) {
        super('terminationoftheparticipationofanemployeeinthefundg', http);
    }
}


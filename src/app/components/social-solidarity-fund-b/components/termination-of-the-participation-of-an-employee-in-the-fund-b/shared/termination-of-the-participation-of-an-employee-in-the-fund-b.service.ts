import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundB } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-b';

@Injectable()

export class TerminationOfTheParticipationOfAnEmployeeInTheFundBService extends DataService<TerminationOfTheParticipationOfAnEmployeeInTheFundB> {
    constructor(http: HttpClient) {
        super('terminationoftheparticipationofanemployeeinthefundb', http);
    }
}


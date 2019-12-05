import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EndOfASpecialVacationForEmployeeB } from 'app/shared/models/end-of-a-special-vacation-for-employee-b';

@Injectable()

export class EndOfASpecialVacationForEmployeeBService extends DataService<EndOfASpecialVacationForEmployeeB> {
    constructor(http: HttpClient) {
        super('endofaspecialvacationforemployeeb', http);
    }
}


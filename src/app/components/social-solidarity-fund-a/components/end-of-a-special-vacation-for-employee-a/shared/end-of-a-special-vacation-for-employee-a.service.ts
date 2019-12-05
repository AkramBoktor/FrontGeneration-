import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EndOfASpecialVacationForEmployeeA } from 'app/shared/models/end-of-a-special-vacation-for-employee-a';

@Injectable()

export class EndOfASpecialVacationForEmployeeAService extends DataService<EndOfASpecialVacationForEmployeeA> {
    constructor(http: HttpClient) {
        super('endofaspecialvacationforemployeea', http);
    }
}


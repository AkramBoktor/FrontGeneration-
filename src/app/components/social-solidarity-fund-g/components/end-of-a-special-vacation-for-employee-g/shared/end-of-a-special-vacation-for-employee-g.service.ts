import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EndOfASpecialVacationForEmployeeG } from 'app/shared/models/end-of-a-special-vacation-for-employee-g';

@Injectable()

export class EndOfASpecialVacationForEmployeeGService extends DataService<EndOfASpecialVacationForEmployeeG> {
    constructor(http: HttpClient) {
        super('endofaspecialvacationforemployeeg', http);
    }
}


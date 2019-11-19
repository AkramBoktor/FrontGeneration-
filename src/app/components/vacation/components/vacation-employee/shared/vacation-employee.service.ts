import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { VacationEmployee } from 'app/shared/models/vacation-employee';

@Injectable()

export class VacationEmployeeService extends DataService<VacationEmployee> {
    constructor(http: HttpClient) {
        super('vacationemployee', http);
    }
}


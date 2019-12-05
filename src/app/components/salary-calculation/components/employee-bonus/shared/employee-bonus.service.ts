import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeBonus } from 'app/shared/models/employee-bonus';

@Injectable()

export class EmployeeBonusService extends DataService<EmployeeBonus> {
    constructor(http: HttpClient) {
        super('employeebonus', http);
    }
}


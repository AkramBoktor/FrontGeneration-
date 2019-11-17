import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeeCardDefinition } from 'app/shared/models/employee-card-definition';

@Injectable()

export class EmployeeCardDefinitionService extends DataService<EmployeeCardDefinition> {
    constructor(http: HttpClient) {
        super('employeecarddefinition', http);
    }
}


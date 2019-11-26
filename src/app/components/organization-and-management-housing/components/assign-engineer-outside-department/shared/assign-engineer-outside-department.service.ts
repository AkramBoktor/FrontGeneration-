import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssignEngineerOutsideDepartment } from 'app/shared/models/assign-engineer-outside-department';

@Injectable()

export class AssignEngineerOutsideDepartmentService extends DataService<AssignEngineerOutsideDepartment> {
    constructor(http: HttpClient) {
        super('assignengineeroutsidedepartment', http);
    }
}


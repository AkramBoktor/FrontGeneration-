import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment } from 'app/shared/models/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department';

@Injectable()

export class AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService extends DataService<AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment> {
    constructor(http: HttpClient) {
        super('assignthesupervisionofanengineerfromoutsidetheimplementationdepartment', http);
    }
}


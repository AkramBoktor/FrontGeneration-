import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PeopleAssemblyApproval } from 'app/shared/models/people-assembly-approval';

@Injectable()

export class PeopleAssemblyApprovalService extends DataService<PeopleAssemblyApproval> {
    constructor(http: HttpClient) {
        super('peopleassemblyapproval', http);
    }
}


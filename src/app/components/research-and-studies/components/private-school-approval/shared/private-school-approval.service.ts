import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PrivateSchoolApproval } from 'app/shared/models/private-school-approval';

@Injectable()

export class PrivateSchoolApprovalService extends DataService<PrivateSchoolApproval> {
    constructor(http: HttpClient) {
        super('privateschoolapproval', http);
    }
}


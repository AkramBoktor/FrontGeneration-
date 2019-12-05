import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ApprovalType } from 'app/shared/models/approval-type';

@Injectable()

export class ApprovalTypeService extends DataService<ApprovalType> {
    constructor(http: HttpClient) {
        super('approvaltype', http);
    }
}


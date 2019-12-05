import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ApprovalForEquippingSchoolsApprovals } from 'app/shared/models/approval-for-equipping-schools-approvals';

@Injectable()

export class ApprovalForEquippingSchoolsApprovalsService extends DataService<ApprovalForEquippingSchoolsApprovals> {
    constructor(http: HttpClient) {
        super('approvalforequippingschoolsapprovals', http);
    }
}


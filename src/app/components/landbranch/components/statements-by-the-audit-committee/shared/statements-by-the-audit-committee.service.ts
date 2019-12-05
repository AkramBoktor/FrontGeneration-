import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { StatementsByTheAuditCommittee } from 'app/shared/models/statements-by-the-audit-committee';

@Injectable()

export class StatementsByTheAuditCommitteeService extends DataService<StatementsByTheAuditCommittee> {
    constructor(http: HttpClient) {
        super('statementsbytheauditcommittee', http);
    }
}


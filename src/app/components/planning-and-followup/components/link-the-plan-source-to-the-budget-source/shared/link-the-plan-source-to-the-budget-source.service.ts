import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LinkThePlanSourceToTheBudgetSource } from 'app/shared/models/link-the-plan-source-to-the-budget-source';

@Injectable()

export class LinkThePlanSourceToTheBudgetSourceService extends DataService<LinkThePlanSourceToTheBudgetSource> {
    constructor(http: HttpClient) {
        super('linktheplansourcetothebudgetsource', http);
    }
}


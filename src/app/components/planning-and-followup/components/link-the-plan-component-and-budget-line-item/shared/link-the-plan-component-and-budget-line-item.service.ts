import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LinkThePlanComponentAndBudgetLineItem } from 'app/shared/models/link-the-plan-component-and-budget-line-item';

@Injectable()

export class LinkThePlanComponentAndBudgetLineItemService extends DataService<LinkThePlanComponentAndBudgetLineItem> {
    constructor(http: HttpClient) {
        super('linktheplancomponentandbudgetlineitem', http);
    }
}


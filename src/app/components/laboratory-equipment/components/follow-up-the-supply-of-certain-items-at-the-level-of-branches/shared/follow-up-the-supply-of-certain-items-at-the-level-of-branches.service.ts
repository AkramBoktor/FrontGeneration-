import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches } from 'app/shared/models/follow-up-the-supply-of-certain-items-at-the-level-of-branches';

@Injectable()

export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService extends DataService<FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches> {
    constructor(http: HttpClient) {
        super('followupthesupplyofcertainitemsatthelevelofbranches', http);
    }
}


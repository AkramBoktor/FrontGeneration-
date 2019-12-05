import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LandAssignmentDataForLiftingAndInspectionCommittees } from 'app/shared/models/land-assignment-data-for-lifting-and-inspection-committees';

@Injectable()

export class LandAssignmentDataForLiftingAndInspectionCommitteesService extends DataService<LandAssignmentDataForLiftingAndInspectionCommittees> {
    constructor(http: HttpClient) {
        super('landassignmentdataforliftingandinspectioncommittees', http);
    }
}


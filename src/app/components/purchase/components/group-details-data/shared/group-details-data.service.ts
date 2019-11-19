import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { GroupDetailsData } from 'app/shared/models/group-details-data';

@Injectable()

export class GroupDetailsDataService extends DataService<GroupDetailsData> {
    constructor(http: HttpClient) {
        super('groupdetailsdata', http);
    }
}


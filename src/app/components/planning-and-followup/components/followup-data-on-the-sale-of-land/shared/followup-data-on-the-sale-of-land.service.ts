import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FollowupDataOnTheSaleOfLand } from 'app/shared/models/followup-data-on-the-sale-of-land';

@Injectable()

export class FollowupDataOnTheSaleOfLandService extends DataService<FollowupDataOnTheSaleOfLand> {
    constructor(http: HttpClient) {
        super('followupdataonthesaleofland', http);
    }
}


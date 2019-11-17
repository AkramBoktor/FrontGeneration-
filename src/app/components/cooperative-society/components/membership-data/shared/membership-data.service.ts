import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MembershipData } from 'app/shared/models/membership-data';

@Injectable()

export class MembershipDataService extends DataService<MembershipData> {
    constructor(http: HttpClient) {
        super('membershipdata', http);
    }
}


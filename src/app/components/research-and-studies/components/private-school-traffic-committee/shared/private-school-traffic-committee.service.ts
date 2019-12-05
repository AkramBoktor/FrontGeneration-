import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PrivateSchoolTrafficCommittee } from 'app/shared/models/private-school-traffic-committee';

@Injectable()

export class PrivateSchoolTrafficCommitteeService extends DataService<PrivateSchoolTrafficCommittee> {
    constructor(http: HttpClient) {
        super('privateschooltrafficcommittee', http);
    }
}


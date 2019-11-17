import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MinistryOfSolidarityAndCommunications } from 'app/shared/models/ministry-of-solidarity-and-communications';

@Injectable()

export class MinistryOfSolidarityAndCommunicationsService extends DataService<MinistryOfSolidarityAndCommunications> {
    constructor(http: HttpClient) {
        super('ministryofsolidarityandcommunications', http);
    }
}


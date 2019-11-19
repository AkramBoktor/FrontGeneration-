import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EnvelopesOpennigCommetyMembersData } from 'app/shared/models/envelopes-opennig-commety-members-data';

@Injectable()

export class EnvelopesOpennigCommetyMembersDataService extends DataService<EnvelopesOpennigCommetyMembersData> {
    constructor(http: HttpClient) {
        super('envelopesopennigcommetymembersdata', http);
    }
}


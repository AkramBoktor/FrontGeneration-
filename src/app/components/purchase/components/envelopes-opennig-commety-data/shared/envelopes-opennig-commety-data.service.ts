import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EnvelopesOpennigCommetyData } from 'app/shared/models/envelopes-opennig-commety-data';

@Injectable()

export class EnvelopesOpennigCommetyDataService extends DataService<EnvelopesOpennigCommetyData> {
    constructor(http: HttpClient) {
        super('envelopesopennigcommetydata', http);
    }
}


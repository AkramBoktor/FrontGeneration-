import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CommitteesFormationData } from 'app/shared/models/committees-formation-data';

@Injectable()

export class CommitteesFormationDataService extends DataService<CommitteesFormationData> {
    constructor(http: HttpClient) {
        super('committeesformationdata', http);
    }
}


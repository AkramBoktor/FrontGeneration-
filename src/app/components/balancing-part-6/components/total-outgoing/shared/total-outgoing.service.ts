import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TotalOutgoing } from 'app/shared/models/total-outgoing';

@Injectable()

export class TotalOutgoingService extends DataService<TotalOutgoing> {
    constructor(http: HttpClient) {
        super('totaloutgoing', http);
    }
}


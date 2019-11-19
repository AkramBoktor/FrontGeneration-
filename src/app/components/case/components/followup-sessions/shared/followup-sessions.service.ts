import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FollowupSessions } from 'app/shared/models/followup-sessions';

@Injectable()

export class FollowupSessionsService extends DataService<FollowupSessions> {
    constructor(http: HttpClient) {
        super('followupsessions', http);
    }
}


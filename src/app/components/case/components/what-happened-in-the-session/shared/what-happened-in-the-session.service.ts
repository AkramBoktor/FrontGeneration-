import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { WhatHappenedInTheSession } from 'app/shared/models/what-happened-in-the-session';

@Injectable()

export class WhatHappenedInTheSessionService extends DataService<WhatHappenedInTheSession> {
    constructor(http: HttpClient) {
        super('whathappenedinthesession', http);
    }
}


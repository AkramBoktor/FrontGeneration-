import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Adequacy } from 'app/shared/models/adequacy';

@Injectable()

export class AdequacyService extends DataService<Adequacy> {
    constructor(http: HttpClient) {
        super('adequacy', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IndexationOpening } from 'app/shared/models/indexation-opening';

@Injectable()

export class IndexationOpeningService extends DataService<IndexationOpening> {
    constructor(http: HttpClient) {
        super('indexationopening', http);
    }
}


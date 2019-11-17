import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Occasion } from 'app/shared/models/occasion';

@Injectable()

export class OccasionService extends DataService<Occasion> {
    constructor(http: HttpClient) {
        super('occasion', http);
    }
}


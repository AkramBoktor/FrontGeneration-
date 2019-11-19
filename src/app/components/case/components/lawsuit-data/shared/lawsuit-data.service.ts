import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LawsuitData } from 'app/shared/models/lawsuit-data';

@Injectable()

export class LawsuitDataService extends DataService<LawsuitData> {
    constructor(http: HttpClient) {
        super('lawsuitdata', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ConcreteMixtureData } from 'app/shared/models/concrete-mixture-data';

@Injectable()

export class ConcreteMixtureDataService extends DataService<ConcreteMixtureData> {
    constructor(http: HttpClient) {
        super('concretemixturedata', http);
    }
}


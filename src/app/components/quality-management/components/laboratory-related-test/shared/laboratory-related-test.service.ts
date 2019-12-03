import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { LaboratoryRelatedTest } from 'app/shared/models/laboratory-related-test';

@Injectable()

export class LaboratoryRelatedTestService extends DataService<LaboratoryRelatedTest> {
    constructor(http: HttpClient) {
        super('laboratoryrelatedtest', http);
    }
}


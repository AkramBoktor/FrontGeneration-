import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { OperativeSentence } from 'app/shared/models/operative-sentence';

@Injectable()

export class OperativeSentenceService extends DataService<OperativeSentence> {
    constructor(http: HttpClient) {
        super('operativesentence', http);
    }
}


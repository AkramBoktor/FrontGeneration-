import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ArbitrationTopics } from 'app/shared/models/arbitration-topics';

@Injectable()

export class ArbitrationTopicsService extends DataService<ArbitrationTopics> {
    constructor(http: HttpClient) {
        super('arbitrationtopics', http);
    }
}


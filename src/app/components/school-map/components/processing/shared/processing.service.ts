import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Processing } from 'app/shared/models/processing';

@Injectable()

export class ProcessingService extends DataService<Processing> {
    constructor(http: HttpClient) {
        super('processing', http);
    }
}


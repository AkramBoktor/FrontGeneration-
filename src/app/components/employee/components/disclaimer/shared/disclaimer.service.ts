import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Disclaimer } from 'app/shared/models/disclaimer';

@Injectable()

export class DisclaimerService extends DataService<Disclaimer> {
    constructor(http: HttpClient) {
        super('disclaimer', http);
    }
}


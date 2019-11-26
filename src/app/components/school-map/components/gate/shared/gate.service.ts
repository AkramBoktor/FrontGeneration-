import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Gate } from 'app/shared/models/gate';

@Injectable()

export class GateService extends DataService<Gate> {
    constructor(http: HttpClient) {
        super('gate', http);
    }
}


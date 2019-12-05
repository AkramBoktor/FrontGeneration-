import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Malfunction } from 'app/shared/models/malfunction';

@Injectable()

export class MalfunctionService extends DataService<Malfunction> {
    constructor(http: HttpClient) {
        super('malfunction', http);
    }
}


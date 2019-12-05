import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Allowance } from 'app/shared/models/allowance';

@Injectable()

export class AllowanceService extends DataService<Allowance> {
    constructor(http: HttpClient) {
        super('allowance', http);
    }
}


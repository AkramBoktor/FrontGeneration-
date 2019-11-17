import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Retirement } from 'app/shared/models/retirement';

@Injectable()

export class RetirementService extends DataService<Retirement> {
    constructor(http: HttpClient) {
        super('retirement', http);
    }
}


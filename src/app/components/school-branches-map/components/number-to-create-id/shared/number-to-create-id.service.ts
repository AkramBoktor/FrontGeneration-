import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { NumberToCreateID } from 'app/shared/models/number-to-create-id';

@Injectable()

export class NumberToCreateIDService extends DataService<NumberToCreateID> {
    constructor(http: HttpClient) {
        super('numbertocreateid', http);
    }
}


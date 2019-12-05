import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Bonus57 } from 'app/shared/models/bonus-5-7';

@Injectable()

export class Bonus57Service extends DataService<Bonus57> {
    constructor(http: HttpClient) {
        super('bonus57', http);
    }
}


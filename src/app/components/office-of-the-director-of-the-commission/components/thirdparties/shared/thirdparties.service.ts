import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { Thirdparties } from 'app/shared/models/thirdparties';

@Injectable()

export class ThirdpartiesService extends DataService<Thirdparties> {
    constructor(http: HttpClient) {
        super('thirdparties', http);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DependentName } from 'app/shared/models/dependent-name';

@Injectable()

export class DependentNameService extends DataService<DependentName> {
    constructor(http: HttpClient) {
        super('dependentname', http);
    }
}

